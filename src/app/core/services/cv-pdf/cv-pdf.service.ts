import { Injectable, NgZone, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import type { FontInput } from '@libpdf/core';

import type { Skill } from '@models';
import {
  PERSONAL_INFO,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
  METHODOLOGIES,
  EXPERIENCES,
  SKILLS,
} from '@data';

import {
  PAGE_WIDTH,
  MARGIN_LEFT,
  MARGIN_RIGHT,
  CONTENT_TOP_Y,
  CONTENT_BOTTOM_Y,
  CONTENT_START_OFFSET,
  FONT_SIZE,
  LINE_HEIGHT,
  SECTION_GAP,
  ITEM_GAP,
  SECTION_BAR_HEIGHT,
  SECTION_BAR_PADDING_X,
  SECTION_BAR_PADDING_Y,
  NAME_BOTTOM_GAP,
  EXP_MIN_SPACE,
  CERT_EXTRA_GAP,
  SECTION_BAR_MARGIN_BOTTOM,
  FOOTER_Y,
  EUROPASS_COPYRIGHT,
  DATE_LOCALE,
  LANG_LEVEL_INDENT,
  SKILLS_INDENT,
  COLOR,
  DATE_COL_X,
  DATE_COL_WIDTH,
  COL_GAP,
  CONTENT_COL_X,
  CONTENT_COL_W,
  YIELD_EVERY_ITEMS,
  CATEGORY_LABELS,
} from './cv-pdf.config';

/**
 * Generates a CV PDF following the Europass visual template:
 * - Europass blue (#003399) color scheme
 * - Blue filled section bars with white text
 * - Per-page footer: date + copyright + page number
 * - Two-column layout: right-aligned gray labels | content
 *
 * Lazy-loads @libpdf/core on first use.
 * All rendering runs outside Angular's zone.
 */
@Injectable({ providedIn: 'root' })
export class CvPdfService {
  private readonly ngZone = inject(NgZone);
  private readonly transloco = inject(TranslocoService);

  private readonly isGeneratingState = signal(false);
  readonly isGenerating = this.isGeneratingState.asReadonly();

  private libpdf: typeof import('@libpdf/core') | null = null;

  private readonly skillsByCategory = this.groupSkillsByCategory();

  // ─── Public API ──────────────────────────────────────────────────────────────

  async generateCv(): Promise<void> {
    if (this.isGeneratingState()) return;

    this.isGeneratingState.set(true);
    try {
      await this.ngZone.runOutsideAngular(() => this.generateCvOutsideAngular());
    } finally {
      this.ngZone.run(() => this.isGeneratingState.set(false));
    }
  }

  // ─── Core generation ─────────────────────────────────────────────────────────

  private async generateCvOutsideAngular(): Promise<void> {
    const lib = await this.loadLibpdf();
    const { PDF, StandardFonts, rgb, layoutText, measureText } = lib;

    // Shorthand: avoids repeating rgb(col.r, col.g, col.b) ~30 times across the file
    const c = (col: { r: number; g: number; b: number }) => rgb(col.r, col.g, col.b);

    const pdf = PDF.create();
    const pages: ReturnType<typeof pdf.addPage>[] = [];

    const fontR: FontInput = StandardFonts.Helvetica;
    const fontB: FontInput = StandardFonts.HelveticaBold;
    const fontI: FontInput = StandardFonts.HelveticaOblique;

    const today = new Date().toLocaleDateString(DATE_LOCALE);

    // Mutable cursor — advances downward as content is drawn
    let mainY = CONTENT_TOP_Y - CONTENT_START_OFFSET;
    let page = pdf.addPage({ size: 'a4' });
    pages.push(page);

    // ── Page management ──────────────────────────────────────────────────────

    const startNewPage = (): void => {
      page = pdf.addPage({ size: 'a4' });
      pages.push(page);
      mainY = CONTENT_TOP_Y - CONTENT_START_OFFSET;
    };

    const ensureSpace = (needed: number): void => {
      if (mainY - needed < CONTENT_BOTTOM_Y) startNewPage();
    };

    // ── Section header bar: full-width blue rectangle + white uppercase text ─

    const drawSectionBar = (title: string): void => {
      ensureSpace(SECTION_GAP + SECTION_BAR_HEIGHT + SECTION_BAR_PADDING_Y);
      mainY -= SECTION_GAP / 2;

      page.drawRectangle({
        x: MARGIN_LEFT,
        y: mainY - SECTION_BAR_HEIGHT,
        width: PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT,
        height: SECTION_BAR_HEIGHT,
        color: c(COLOR.primary),
      });

      page.drawText(title.toUpperCase(), {
        x: MARGIN_LEFT + SECTION_BAR_PADDING_X,
        y: mainY - SECTION_BAR_HEIGHT + SECTION_BAR_PADDING_Y,
        font: fontB,
        size: FONT_SIZE.sectionTitle,
        color: c(COLOR.white),
      });

      mainY -= SECTION_BAR_HEIGHT + SECTION_GAP / 2 + SECTION_BAR_MARGIN_BOTTOM;
    };

    // ── Wraps and draws text; returns number of lines rendered ───────────────

    const drawWrapped = (
      text: string,
      x: number,
      maxW: number,
      font: FontInput,
      size: number,
      colorObj: { r: number; g: number; b: number },
    ): number => {
      if (!text.trim()) return 0;
      const result = layoutText(text, font, size, maxW, LINE_HEIGHT);
      for (const ln of result.lines) {
        ensureSpace(LINE_HEIGHT);
        page.drawText(ln.text, { x, y: mainY, font, size, color: c(colorObj) });
        mainY -= LINE_HEIGHT;
      }
      return result.lines.length;
    };

    // ── Two-column row: right-aligned gray label | value ────────────────────
    // Mirrors the Europass layout where left column holds labels right-aligned.

    const drawTwoColRow = (
      label: string,
      value: string,
      valueFont: FontInput = fontR,
      valueColor = COLOR.dark,
    ): void => {
      if (!value) return;
      ensureSpace(LINE_HEIGHT);

      const labelW = measureText(label, fontR, FONT_SIZE.small);
      page.drawText(label, {
        x: CONTENT_COL_X - COL_GAP - labelW,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.gray),
      });

      page.drawText(value, {
        x: CONTENT_COL_X,
        y: mainY,
        font: valueFont,
        size: FONT_SIZE.small,
        color: c(valueColor),
      });

      mainY -= LINE_HEIGHT;
    };

    // ─── SECTION 1: PERSONAL INFORMATION ────────────────────────────────────

    drawSectionBar(this.t('cv.section-personal-info'));

    // Name: large italic blue — the Europass identity focal point
    page.drawText(`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName}`, {
      x: CONTENT_COL_X,
      y: mainY,
      font: fontI,
      size: FONT_SIZE.name,
      color: c(COLOR.primary),
    });
    mainY -= FONT_SIZE.name + NAME_BOTTOM_GAP;

    drawTwoColRow(this.t('cv.label-location'), PERSONAL_INFO.location);
    drawTwoColRow(this.t('cv.label-nationality'), PERSONAL_INFO.nationality);
    drawTwoColRow(this.t('cv.label-email'), PERSONAL_INFO.email);
    drawTwoColRow('LinkedIn', PERSONAL_INFO.linkedinHandle);
    drawTwoColRow('GitHub', PERSONAL_INFO.githubHandle);

    mainY -= ITEM_GAP;
    await this.yieldToMainThread();

    // ─── SECTION 2: WORK EXPERIENCE ──────────────────────────────────────────

    drawSectionBar(this.t('cv.section-experience'));

    let drawOps = 0;

    for (const exp of EXPERIENCES) {
      ensureSpace(EXP_MIN_SPACE);

      // Period — left column, blue bold
      page.drawText(exp.dateRange, {
        x: DATE_COL_X,
        y: mainY,
        font: fontB,
        size: FONT_SIZE.small,
        color: c(COLOR.primary),
        maxWidth: DATE_COL_WIDTH,
      });

      // Job title — right column, blue bold, slightly larger
      page.drawText(this.t(exp.title), {
        x: CONTENT_COL_X,
        y: mainY,
        font: fontB,
        size: FONT_SIZE.subTitle,
        color: c(COLOR.primary),
        maxWidth: CONTENT_COL_W,
      });
      mainY -= LINE_HEIGHT;

      // Company · contract type
      page.drawText(`${exp.company}  ·  ${this.t(exp.contractType)}`, {
        x: CONTENT_COL_X,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.gray),
        maxWidth: CONTENT_COL_W,
      });
      mainY -= LINE_HEIGHT;

      // Description
      drawWrapped(
        this.t(exp.description),
        CONTENT_COL_X,
        CONTENT_COL_W,
        fontR,
        FONT_SIZE.small,
        COLOR.gray,
      );

      // Missions
      for (const mission of exp.missions) {
        drawOps++;
        if (drawOps % YIELD_EVERY_ITEMS === 0) await this.yieldToMainThread();

        mainY -= ITEM_GAP;
        ensureSpace(LINE_HEIGHT * 2);

        // Mission title — bold primary
        page.drawText(this.t(mission.title), {
          x: CONTENT_COL_X,
          y: mainY,
          font: fontB,
          size: FONT_SIZE.body,
          color: c(COLOR.primary),
        });
        mainY -= LINE_HEIGHT;

        // Client + sector (optional)
        if (mission.client) {
          const clientLabel = `${this.t('cv.label-client')}: ${mission.client}`;
          const sectorPart = mission.sector ? `  —  ${this.t(mission.sector)}` : '';
          page.drawText(`${clientLabel}${sectorPart}`, {
            x: CONTENT_COL_X,
            y: mainY,
            font: fontR,
            size: FONT_SIZE.small,
            color: c(COLOR.gray),
            maxWidth: CONTENT_COL_W,
          });
          mainY -= LINE_HEIGHT;
        }

        // Achievements (max 4, then "+N others" note)
        const MAX_ACHIEVEMENTS = 4;
        const displayed = mission.achievements.slice(0, MAX_ACHIEVEMENTS);
        const remaining = mission.achievements.length - displayed.length;

        for (const ach of displayed) {
          ensureSpace(LINE_HEIGHT);
          drawWrapped(
            `• ${this.t(ach)}`,
            CONTENT_COL_X,
            CONTENT_COL_W,
            fontR,
            FONT_SIZE.body,
            COLOR.dark,
          );
        }

        if (remaining > 0) {
          ensureSpace(LINE_HEIGHT);
          page.drawText(this.t('cv.label-more-achievements', { n: remaining }), {
            x: CONTENT_COL_X,
            y: mainY,
            font: fontR,
            size: FONT_SIZE.small,
            color: c(COLOR.gray),
          });
          mainY -= LINE_HEIGHT;
        }

        // Technology stack (max 8 items, then "+N" suffix)
        const MAX_TECHS = 8;
        const techList = mission.technologies ?? [];
        const displayedTechs = techList.slice(0, MAX_TECHS);
        const remainingTechs = techList.length - displayedTechs.length;

        if (displayedTechs.length > 0) {
          const techSuffix = remainingTechs > 0 ? ` +${remainingTechs}` : '';
          const techText = `${this.t('cv.label-stack')}: ${displayedTechs.join(', ')}${techSuffix}`;
          ensureSpace(LINE_HEIGHT);
          drawWrapped(techText, CONTENT_COL_X, CONTENT_COL_W, fontR, FONT_SIZE.small, COLOR.gray);
        }
      }

      mainY -= ITEM_GAP * 2;
    }

    await this.yieldToMainThread();

    // ─── SECTION 3: EDUCATION AND TRAINING ──────────────────────────────────

    drawSectionBar(this.t('cv.section-education'));

    for (const edu of EDUCATION) {
      ensureSpace(LINE_HEIGHT * 3);

      const dateRange =
        edu.startYear === edu.endYear ? edu.startYear : `${edu.startYear}–${edu.endYear}`;

      // Period — left column, blue
      page.drawText(dateRange, {
        x: DATE_COL_X,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.primary),
        maxWidth: DATE_COL_WIDTH,
      });

      // Degree title — right column, blue bold
      page.drawText(edu.title, {
        x: CONTENT_COL_X,
        y: mainY,
        font: fontB,
        size: FONT_SIZE.body,
        color: c(COLOR.primary),
        maxWidth: CONTENT_COL_W,
      });
      mainY -= LINE_HEIGHT;

      // Institution · location
      page.drawText(`${edu.institution}  ·  ${edu.location}`, {
        x: CONTENT_COL_X,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.gray),
        maxWidth: CONTENT_COL_W,
      });
      mainY -= LINE_HEIGHT;

      if (edu.specialization) {
        drawWrapped(
          edu.specialization,
          CONTENT_COL_X,
          CONTENT_COL_W,
          fontR,
          FONT_SIZE.small,
          COLOR.gray,
        );
      }

      mainY -= ITEM_GAP;
    }

    await this.yieldToMainThread();

    // ─── SECTION 4: PERSONAL SKILLS ──────────────────────────────────────────

    drawSectionBar(this.t('cv.section-skills'));

    // A) Mother tongue — left label, right value
    const [motherTongue, ...otherLanguages] = LANGUAGES;
    drawTwoColRow(this.t('cv.label-mother-tongue'), `${motherTongue.name} (${motherTongue.cecrl})`);
    mainY -= ITEM_GAP;

    // B) Other languages — label aligned with first row, values stacked below
    if (otherLanguages.length > 0) {
      ensureSpace(LINE_HEIGHT);
      const otherLabel = this.t('cv.label-other-languages');
      const otherLabelW = measureText(otherLabel, fontR, FONT_SIZE.small);
      page.drawText(otherLabel, {
        x: CONTENT_COL_X - COL_GAP - otherLabelW,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.gray),
      });

      for (const lang of otherLanguages) {
        ensureSpace(LINE_HEIGHT);
        page.drawText(lang.name, {
          x: CONTENT_COL_X,
          y: mainY,
          font: fontB,
          size: FONT_SIZE.body,
          color: c(COLOR.dark),
          maxWidth: DATE_COL_WIDTH,
        });
        page.drawText(`${lang.level}  —  ${lang.cecrl}`, {
          x: CONTENT_COL_X + DATE_COL_WIDTH + LANG_LEVEL_INDENT,
          y: mainY,
          font: fontR,
          size: FONT_SIZE.body,
          color: c(COLOR.gray),
        });
        mainY -= LINE_HEIGHT;
      }
      mainY -= ITEM_GAP;
    }

    // C) Computer skills — grouped by category
    ensureSpace(LINE_HEIGHT);
    const computerSkillsLabel = this.t('cv.label-computer-skills');
    const csLabelW = measureText(computerSkillsLabel, fontR, FONT_SIZE.small);
    page.drawText(computerSkillsLabel, {
      x: CONTENT_COL_X - COL_GAP - csLabelW,
      y: mainY,
      font: fontR,
      size: FONT_SIZE.small,
      color: c(COLOR.gray),
    });

    for (const [cat, skills] of this.skillsByCategory) {
      ensureSpace(LINE_HEIGHT);
      const prefix = `${cat}: `;
      const prefixW = measureText(prefix, fontB, FONT_SIZE.small);

      page.drawText(prefix, {
        x: CONTENT_COL_X + SKILLS_INDENT,
        y: mainY,
        font: fontB,
        size: FONT_SIZE.small,
        color: c(COLOR.dark),
      });

      const skillNames = skills.map((s) => s.name).join(', ');
      drawWrapped(
        skillNames,
        CONTENT_COL_X + SKILLS_INDENT + prefixW,
        CONTENT_COL_W - SKILLS_INDENT - prefixW,
        fontR,
        FONT_SIZE.small,
        COLOR.gray,
      );
    }

    mainY -= ITEM_GAP;

    // D) Methodologies
    drawTwoColRow(this.t('cv.label-methodologies'), METHODOLOGIES.join('  ·  '));

    await this.yieldToMainThread();

    // ─── SECTION 5: CERTIFICATIONS AND LICENSES ──────────────────────────────

    drawSectionBar(this.t('cv.section-certifications'));

    for (const cert of CERTIFICATIONS) {
      ensureSpace(LINE_HEIGHT * 2);

      // Date — left column, blue
      page.drawText(cert.date, {
        x: DATE_COL_X,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.primary),
        maxWidth: DATE_COL_WIDTH,
      });

      // Certification name — right column, blue bold
      page.drawText(cert.name, {
        x: CONTENT_COL_X,
        y: mainY,
        font: fontB,
        size: FONT_SIZE.body,
        color: c(COLOR.primary),
        maxWidth: CONTENT_COL_W,
      });
      mainY -= LINE_HEIGHT;

      // Provider
      page.drawText(cert.provider, {
        x: CONTENT_COL_X,
        y: mainY,
        font: fontR,
        size: FONT_SIZE.small,
        color: c(COLOR.gray),
      });
      mainY -= LINE_HEIGHT + CERT_EXTRA_GAP;
    }

    await this.yieldToMainThread();

    // ─── FOOTERS: applied to all pages once total count is known ─────────────

    const totalPages = pages.length;
    const copyrightW = measureText(EUROPASS_COPYRIGHT, fontR, FONT_SIZE.copyright);

    pages.forEach((p, idx) => {
      // Left: document date
      p.drawText(today, {
        x: MARGIN_LEFT,
        y: FOOTER_Y,
        font: fontR,
        size: FONT_SIZE.footer,
        color: c(COLOR.gray),
      });

      // Center: Europass copyright notice
      p.drawText(EUROPASS_COPYRIGHT, {
        x: PAGE_WIDTH / 2 - copyrightW / 2,
        y: FOOTER_Y,
        font: fontR,
        size: FONT_SIZE.copyright,
        color: c(COLOR.gray),
      });

      // Right: page number
      const pageLabel = `Page ${idx + 1} / ${totalPages}`;
      const pageLabelW = measureText(pageLabel, fontR, FONT_SIZE.footer);
      p.drawText(pageLabel, {
        x: PAGE_WIDTH - MARGIN_RIGHT - pageLabelW,
        y: FOOTER_Y,
        font: fontR,
        size: FONT_SIZE.footer,
        color: c(COLOR.gray),
      });
    });

    // ─── Save & download ─────────────────────────────────────────────────────

    const savedBytes = await pdf.save();
    const bytes = new Uint8Array(savedBytes);
    const lang = this.transloco.getActiveLang();
    const filename = `CV_Michael_Benavides_${lang.toUpperCase()}.pdf`;
    this.triggerDownload(bytes, filename);
  }

  // ─── Private helpers ─────────────────────────────────────────────────────────

  private t(key: string, params?: Record<string, unknown>): string {
    return this.transloco.translate(key, params);
  }

  private async loadLibpdf(): Promise<typeof import('@libpdf/core')> {
    if (!this.libpdf) {
      this.libpdf = await import('@libpdf/core');
    }
    return this.libpdf;
  }

  private groupSkillsByCategory(): Map<string, Skill[]> {
    const map = new Map<string, Skill[]>();
    for (const skill of SKILLS) {
      const label = CATEGORY_LABELS[skill.category] ?? skill.category;
      const existing = map.get(label);
      if (existing) {
        existing.push(skill);
      } else {
        map.set(label, [skill]);
      }
    }
    return map;
  }

  private yieldToMainThread(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  private triggerDownload(bytes: Uint8Array, filename: string): void {
    // Cast buffer to ArrayBuffer — Uint8Array from pdf.save() uses ArrayBufferLike
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
