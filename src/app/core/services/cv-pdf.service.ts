import { inject, Injectable, NgZone, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import type { SkillCategory } from '@models';
import {
  PERSONAL_INFO,
  PROFILE_TEXT,
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
  METHODOLOGIES,
  SKILLS,
} from '@data';

/** A4 page dimensions in points (72 points = 1 inch) */
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;

/** Font sizes */
const FONT_SIZE = {
  name: 22,
  sectionTitle: 14,
  subTitle: 11,
  body: 9.5,
  small: 8,
} as const;

/** Spacing */
const LINE_HEIGHT = 14;
const SECTION_GAP = 18;
const ITEM_GAP = 6;

/** Colors (RGB 0-1) */
const COLOR = {
  primary: { r: 0.07, g: 0.64, b: 0.93 },
  dark: { r: 0.1, g: 0.1, b: 0.1 },
  gray: { r: 0.4, g: 0.4, b: 0.4 },
  lightGray: { r: 0.85, g: 0.85, b: 0.85 },
} as const;

const MAIN_COLUMN_X = MARGIN;
const MAIN_COLUMN_WIDTH = PAGE_WIDTH - MARGIN * 2;
const HEADER_OFFSET = 66;
const EXPERIENCE_DATE_COLUMN_WIDTH = 74;
const EXPERIENCE_CONTENT_GAP = 10;

const YIELD_EVERY_ITEMS = 16;

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Bases de donnees',
  'cloud-devops': 'Cloud & DevOps',
  'ai-llm': 'IA & LLM',
  tools: 'Outils',
};

interface SchedulerWithYield {
  yield(): Promise<void>;
}

interface MainSectionNode {
  readonly title: string;
  readonly render: () => Promise<void> | void;
}

/**
 * Service for generating a CV PDF using @libpdf/core
 * Lazy-loads the library on first use to minimize bundle size
 */
@Injectable({ providedIn: 'root' })
export class CvPdfService {
  private readonly ngZone = inject(NgZone);
  private readonly transloco = inject(TranslocoService);

  /** Translate an i18n key synchronously — safe after app bootstrap */
  private t(key: string): string {
    return this.transloco.translate(key);
  }

  private readonly isGeneratingState = signal(false);
  readonly isGenerating = this.isGeneratingState.asReadonly();

  // Cached module reference after first lazy-load
  private libpdf: typeof import('@libpdf/core') | null = null;
  private readonly textMeasureContext = this.createTextMeasureContext();

  private readonly skillsByCategory = this.groupSkillsByCategory();

  async generateCv(): Promise<void> {
    if (this.isGeneratingState()) return;
    this.isGeneratingState.set(true);

    try {
      await this.ngZone.runOutsideAngular(() => this.generateCvOutsideAngular());
    } finally {
      this.isGeneratingState.set(false);
    }
  }

  private async generateCvOutsideAngular(): Promise<void> {
    const lib = await this.loadLibpdf();
    const { PDF, StandardFonts, rgb } = lib;

    const pdf = PDF.create();
    const helvetica = StandardFonts.Helvetica;
    const helveticaBold = StandardFonts.HelveticaBold;

    let page = pdf.addPage({ size: 'a4' });
    const pages = [page];
    let mainY = PAGE_HEIGHT - MARGIN - HEADER_OFFSET;

    const drawText = (
      content: string,
      x: number,
      y: number,
      fontSize: number,
      options?: {
        font?: typeof helvetica | typeof helveticaBold;
        color?: { r: number; g: number; b: number };
      },
    ) => {
      const font = options?.font ?? helvetica;
      const color = options?.color ?? COLOR.dark;
      page.drawText(content, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(color.r, color.g, color.b),
      });
    };

    const drawPageFrame = () => {
      page.drawLine({
        start: { x: MAIN_COLUMN_X, y: PAGE_HEIGHT - MARGIN - 48 },
        end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - MARGIN - 48 },
        color: rgb(COLOR.lightGray.r, COLOR.lightGray.g, COLOR.lightGray.b),
        thickness: 1,
      });
    };

    const drawHeader = (showIdentity: boolean) => {
      if (showIdentity) {
        drawText(
          PERSONAL_INFO.fullName.toUpperCase(),
          MAIN_COLUMN_X,
          PAGE_HEIGHT - MARGIN - 12,
          17,
          {
            font: helveticaBold,
            color: COLOR.primary,
          },
        );
        drawText(
          `${PERSONAL_INFO.title} · ${PERSONAL_INFO.subtitle}`,
          MAIN_COLUMN_X,
          PAGE_HEIGHT - MARGIN - 30,
          FONT_SIZE.subTitle,
          { font: helveticaBold },
        );
      }
    };

    const startNewPage = () => {
      page = pdf.addPage({ size: 'a4' });
      pages.push(page);
      drawPageFrame();
      drawHeader(false);
      mainY = PAGE_HEIGHT - MARGIN - HEADER_OFFSET;
    };

    const ensureMainSpace = (needed: number) => {
      if (mainY - needed < MARGIN) {
        startNewPage();
      }
    };

    const drawMainSectionTitle = (title: string) => {
      ensureMainSpace(30);
      mainY -= SECTION_GAP;
      drawText(title.toUpperCase(), MAIN_COLUMN_X, mainY, FONT_SIZE.sectionTitle, {
        font: helveticaBold,
        color: COLOR.primary,
      });
      mainY -= 6;
      page.drawLine({
        start: { x: MAIN_COLUMN_X, y: mainY },
        end: { x: PAGE_WIDTH - MARGIN, y: mainY },
        color: rgb(COLOR.lightGray.r, COLOR.lightGray.g, COLOR.lightGray.b),
        thickness: 0.8,
      });
      mainY -= 10;
    };

    drawPageFrame();
    drawHeader(true);

    let drawOps = 0;

    const renderPersonalInfoSection = () => {
      const infoLines = [
        `${PERSONAL_INFO.location} · ${PERSONAL_INFO.nationality}`,
        PERSONAL_INFO.email,
        `LinkedIn: ${PERSONAL_INFO.linkedinHandle}`,
        `GitHub: ${PERSONAL_INFO.githubHandle}`,
      ];

      for (const entry of infoLines) {
        const wrapped = this.wrapText(entry, MAIN_COLUMN_WIDTH, FONT_SIZE.body, false);
        for (const line of wrapped) {
          ensureMainSpace(LINE_HEIGHT);
          drawText(line, MAIN_COLUMN_X, mainY, FONT_SIZE.body, { color: COLOR.gray });
          mainY -= LINE_HEIGHT;
        }
      }

      const coreSkills = Array.from(this.skillsByCategory.values())
        .flatMap((skills) => skills)
        .slice(0, 12)
        .map((skill) => skill.name)
        .join(' · ');

      const skillsLine = this.wrapText(
        `Competences cles: ${coreSkills}`,
        MAIN_COLUMN_WIDTH,
        FONT_SIZE.small,
        false,
      );

      for (const line of skillsLine) {
        ensureMainSpace(LINE_HEIGHT);
        drawText(line, MAIN_COLUMN_X, mainY, FONT_SIZE.small, { color: COLOR.gray });
        mainY -= LINE_HEIGHT;
      }

      const languageLine = LANGUAGES.map((lang) => `${lang.name} (${lang.cecrl})`).join(' · ');
      const languageWrapped = this.wrapText(
        `Langues: ${languageLine}`,
        MAIN_COLUMN_WIDTH,
        FONT_SIZE.small,
        false,
      );

      for (const line of languageWrapped) {
        ensureMainSpace(LINE_HEIGHT);
        drawText(line, MAIN_COLUMN_X, mainY, FONT_SIZE.small, { color: COLOR.gray });
        mainY -= LINE_HEIGHT;
      }
    };

    const renderProfileSection = () => {
      const profileLines = this.wrapText(PROFILE_TEXT, MAIN_COLUMN_WIDTH, FONT_SIZE.body, false);
      for (const line of profileLines) {
        ensureMainSpace(LINE_HEIGHT);
        drawText(line, MAIN_COLUMN_X, mainY, FONT_SIZE.body, { color: COLOR.gray });
        mainY -= LINE_HEIGHT;
      }
    };

    const renderExperiencesSection = async () => {
      for (const exp of EXPERIENCES) {
        ensureMainSpace(44);
        const experienceDateX = MAIN_COLUMN_X;
        const experienceContentX =
          MAIN_COLUMN_X + EXPERIENCE_DATE_COLUMN_WIDTH + EXPERIENCE_CONTENT_GAP;
        const experienceContentWidth =
          MAIN_COLUMN_WIDTH - EXPERIENCE_DATE_COLUMN_WIDTH - EXPERIENCE_CONTENT_GAP;
        const experienceTopY = mainY;

        const dateLabelLines = this.wrapText(
          exp.dateRange,
          EXPERIENCE_DATE_COLUMN_WIDTH,
          FONT_SIZE.small,
          true,
        );
        let dateY = experienceTopY;
        for (const dateLine of dateLabelLines) {
          drawText(dateLine, experienceDateX, dateY, FONT_SIZE.small, {
            font: helveticaBold,
            color: COLOR.gray,
          });
          dateY -= 11;
        }

        drawText(this.t(exp.title), experienceContentX, experienceTopY, FONT_SIZE.subTitle, {
          font: helveticaBold,
        });
        mainY = experienceTopY;
        mainY -= 14;
        drawText(
          `${exp.company}  |  ${this.t(exp.location)}`,
          experienceContentX,
          mainY,
          FONT_SIZE.small,
          {
            color: COLOR.gray,
          },
        );
        mainY -= 14;

        const descLines = this.wrapText(
          this.t(exp.description),
          experienceContentWidth,
          FONT_SIZE.body,
          false,
        );
        for (const line of descLines) {
          ensureMainSpace(LINE_HEIGHT);
          drawText(line, experienceContentX, mainY, FONT_SIZE.body, { color: COLOR.gray });
          mainY -= LINE_HEIGHT;
        }
        mainY -= 4;

        for (const mission of exp.missions) {
          ensureMainSpace(20);
          drawText(this.t(mission.title), experienceContentX + 8, mainY, FONT_SIZE.body, {
            font: helveticaBold,
            color: COLOR.primary,
          });
          mainY -= LINE_HEIGHT;

          if (mission.client) {
            ensureMainSpace(LINE_HEIGHT);
            drawText(
              `Client : ${mission.client}${mission.sector ? ` — ${this.t(mission.sector)}` : ''}`,
              experienceContentX + 8,
              mainY,
              FONT_SIZE.small,
              { color: COLOR.gray },
            );
            mainY -= LINE_HEIGHT;
          }

          const maxAchievements = Math.min(mission.achievements.length, 4);
          for (let i = 0; i < maxAchievements; i++) {
            const achievementLines = this.wrapText(
              `• ${this.t(mission.achievements[i])}`,
              experienceContentWidth - 16,
              FONT_SIZE.body,
              false,
            );
            for (const line of achievementLines) {
              ensureMainSpace(LINE_HEIGHT);
              drawText(line, experienceContentX + 16, mainY, FONT_SIZE.body);
              mainY -= LINE_HEIGHT;
            }
          }

          if (mission.achievements.length > maxAchievements) {
            ensureMainSpace(LINE_HEIGHT);
            drawText(
              `  + ${mission.achievements.length - maxAchievements} autres realisations`,
              experienceContentX + 16,
              mainY,
              FONT_SIZE.small,
              { color: COLOR.gray },
            );
            mainY -= LINE_HEIGHT;
          }

          ensureMainSpace(LINE_HEIGHT);
          const techStr = mission.technologies.slice(0, 8).join(', ');
          const techSuffix =
            mission.technologies.length > 8 ? ` +${mission.technologies.length - 8}` : '';
          drawText(
            `Stack : ${techStr}${techSuffix}`,
            experienceContentX + 8,
            mainY,
            FONT_SIZE.small,
            {
              color: COLOR.gray,
            },
          );
          mainY -= LINE_HEIGHT + 4;

          drawOps++;
          if (drawOps % YIELD_EVERY_ITEMS === 0) {
            await this.yieldToMainThread();
          }
        }

        mainY -= ITEM_GAP;
      }
    };

    const renderEducationSection = () => {
      for (const edu of EDUCATION) {
        ensureMainSpace(24);
        drawText(edu.title, MAIN_COLUMN_X, mainY, FONT_SIZE.body, { font: helveticaBold });
        mainY -= LINE_HEIGHT;
        drawText(
          `${edu.institution}  |  ${edu.location}  |  ${edu.startYear} - ${edu.endYear}`,
          MAIN_COLUMN_X,
          mainY,
          FONT_SIZE.small,
          { color: COLOR.gray },
        );
        mainY -= LINE_HEIGHT;

        if (edu.specialization) {
          const specLines = this.wrapText(
            edu.specialization,
            MAIN_COLUMN_WIDTH,
            FONT_SIZE.small,
            false,
          );
          for (const line of specLines) {
            ensureMainSpace(LINE_HEIGHT);
            drawText(line, MAIN_COLUMN_X, mainY, FONT_SIZE.small, { color: COLOR.gray });
            mainY -= LINE_HEIGHT;
          }
        }
        mainY -= ITEM_GAP;
      }
    };

    const renderMethodologiesSection = () => {
      ensureMainSpace(30);
      drawText('Methodologies :', MAIN_COLUMN_X, mainY, FONT_SIZE.body, {
        font: helveticaBold,
        color: COLOR.primary,
      });
      mainY -= LINE_HEIGHT;
      const methStr = METHODOLOGIES.join('  |  ');
      const methLines = this.wrapText(methStr, MAIN_COLUMN_WIDTH, FONT_SIZE.small, false);
      for (const line of methLines) {
        ensureMainSpace(LINE_HEIGHT);
        drawText(line, MAIN_COLUMN_X, mainY, FONT_SIZE.small, { color: COLOR.gray });
        mainY -= LINE_HEIGHT;
      }
    };

    const renderCertificationsSection = () => {
      for (const cert of CERTIFICATIONS) {
        ensureMainSpace(LINE_HEIGHT);
        drawText(
          `${cert.name}  —  ${cert.provider} (${cert.date})`,
          MAIN_COLUMN_X,
          mainY,
          FONT_SIZE.small,
        );
        mainY -= LINE_HEIGHT;
      }
    };

    const mainSectionTree: MainSectionNode[] = [
      { title: 'Informations Personnelles', render: renderPersonalInfoSection },
      { title: 'Profil', render: renderProfileSection },
      { title: 'Experiences Professionnelles', render: renderExperiencesSection },
      { title: 'Formation', render: renderEducationSection },
      { title: 'Methodologies', render: renderMethodologiesSection },
      { title: 'Certifications', render: renderCertificationsSection },
    ];

    for (const section of mainSectionTree) {
      drawMainSectionTitle(section.title);
      await section.render();
    }

    const totalPages = pages.length;
    for (let index = 0; index < totalPages; index++) {
      const pageLabel = `${index + 1} / ${totalPages}`;
      const pageLabelWidth = this.measureTextWidth(pageLabel, FONT_SIZE.small, false);
      pages[index].drawText(pageLabel, {
        x: PAGE_WIDTH - MARGIN - pageLabelWidth,
        y: MARGIN - 20,
        size: FONT_SIZE.small,
        font: helvetica,
        color: rgb(COLOR.gray.r, COLOR.gray.g, COLOR.gray.b),
      });
    }

    // Save and trigger download
    const bytes = await pdf.save();
    this.triggerDownload(bytes, 'CV_Michael_Benavides.pdf');
  }

  /** Lazy-load @libpdf/core on first call */
  private async loadLibpdf() {
    if (!this.libpdf) {
      this.libpdf = await import('@libpdf/core');
    }
    return this.libpdf;
  }

  /** Text wrapping based on real font metrics */
  private wrapText(text: string, maxWidth: number, fontSize: number, isBold: boolean): string[] {
    const normalizedText = text.replace(/\s+/g, ' ').trim();
    if (!normalizedText) return [];

    const lib = this.libpdf;
    if (lib) {
      const font = isBold ? lib.StandardFonts.HelveticaBold : lib.StandardFonts.Helvetica;
      return lib
        .layoutText(normalizedText, font, fontSize, maxWidth, LINE_HEIGHT)
        .lines.map((line) => line.text);
    }

    const words = normalizedText.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      const candidateWidth = this.measureTextWidth(candidate, fontSize, isBold);

      if (candidateWidth <= maxWidth) {
        currentLine = candidate;
        continue;
      }

      if (currentLine) {
        lines.push(currentLine);
      }

      const wordWidth = this.measureTextWidth(word, fontSize, isBold);
      if (wordWidth <= maxWidth) {
        currentLine = word;
      } else {
        const chunks = this.splitWordByWidth(word, maxWidth, fontSize, isBold);
        lines.push(...chunks.slice(0, -1));
        currentLine = chunks[chunks.length - 1] ?? '';
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  private splitWordByWidth(
    word: string,
    maxWidth: number,
    fontSize: number,
    isBold: boolean,
  ): string[] {
    const chunks: string[] = [];
    let cursor = '';

    for (const char of word) {
      const candidate = `${cursor}${char}`;
      if (this.measureTextWidth(candidate, fontSize, isBold) <= maxWidth) {
        cursor = candidate;
        continue;
      }

      if (cursor) {
        chunks.push(cursor);
      }
      cursor = char;
    }

    if (cursor) {
      chunks.push(cursor);
    }

    return chunks;
  }

  private createTextMeasureContext(): CanvasRenderingContext2D | null {
    const canvas = document.createElement('canvas');
    return canvas.getContext('2d');
  }

  private measureTextWidth(text: string, fontSize: number, isBold: boolean): number {
    const lib = this.libpdf;
    if (lib) {
      const font = isBold ? lib.StandardFonts.HelveticaBold : lib.StandardFonts.Helvetica;
      return lib.measureText(text, font, fontSize);
    }

    if (!this.textMeasureContext) {
      return text.length * fontSize * 0.5;
    }

    this.textMeasureContext.font = `${isBold ? '700' : '400'} ${fontSize}px Helvetica`;
    return this.textMeasureContext.measureText(text).width;
  }

  /** Group skills by category label for PDF rendering */
  private groupSkillsByCategory() {
    const grouped = new Map<string, (typeof SKILLS)[number][]>();
    for (const skill of SKILLS) {
      const label = CATEGORY_LABELS[skill.category];
      const entry = grouped.get(label) ?? [];
      grouped.set(label, entry);
      entry.push(skill);
    }
    return grouped;
  }

  private async yieldToMainThread(): Promise<void> {
    const scheduler = (globalThis as { scheduler?: SchedulerWithYield }).scheduler;
    if (scheduler?.yield) {
      await scheduler.yield();
      return;
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  /** Create a Blob from bytes and trigger browser download */
  private triggerDownload(bytes: Uint8Array<ArrayBufferLike>, filename: string): void {
    const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
