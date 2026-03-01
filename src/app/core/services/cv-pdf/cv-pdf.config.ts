import type { SkillCategory } from '@models';

// ─── Page dimensions ──────────────────────────────────────────────────────────
/** A4 dimensions in points (1 inch = 72pt, 1 cm ≈ 28.35pt) */
export const PAGE_WIDTH = 595.28;
export const PAGE_HEIGHT = 841.89;

// ─── Margins (Europass spec) ─────────────────────────────────────────────────
export const MARGIN_LEFT = 71; // 2.5 cm
export const MARGIN_RIGHT = 57; // 2 cm
export const MARGIN_TOP = 57; // 2 cm
export const MARGIN_BOTTOM = 57; // 2 cm

// ─── Content boundaries ──────────────────────────────────────────────────────
/** Height reserved for the per-page header band (within top margin) */
export const PAGE_HEADER_HEIGHT = 30;
/** Gap between the header separator line and the first content element */
export const CONTENT_START_OFFSET = 8;
/** Y coordinate where drawable content starts */
export const CONTENT_TOP_Y = PAGE_HEIGHT - MARGIN_TOP;
/** Y coordinate below which content must not be drawn (footer reserved area) */
export const CONTENT_BOTTOM_Y = MARGIN_BOTTOM + 20;

// ─── Font sizes (base 10pt — Europass spec) ──────────────────────────────────
export const FONT_SIZE = {
  name: 18, // Full name in PERSONAL INFORMATION
  header: 9, // Per-page header elements (logo label, name)
  sectionTitle: 10, // White text in blue section bars
  subTitle: 11, // Job / degree title
  body: 10, // Standard body text
  small: 8, // Secondary / meta text
  footer: 7, // Page number and date in footer
  copyright: 6, // Europass copyright line
} as const;

// ─── Vertical spacing ────────────────────────────────────────────────────────
export const LINE_HEIGHT = 14;
export const SECTION_GAP = 14;
export const ITEM_GAP = 8;
export const SECTION_BAR_HEIGHT = 16;
/** Gap below the large italic name in PERSONAL INFORMATION */
export const NAME_BOTTOM_GAP = 8;
/** Minimum vertical space required to start a new experience entry */
export const EXP_MIN_SPACE = 44;
/** Extra bottom gap after each certification row */
export const CERT_EXTRA_GAP = 2;
/** Spacing between the bottom of a section bar and its first content item */
export const SECTION_BAR_MARGIN_BOTTOM = 10;

// ─── Per-page header layout ───────────────────────────────────────────────────
export const LOGO_SIZE = 22; // Blue square side in pts
export const LOGO_DOT_SIZE = 2.5; // EU star dot side in pts
export const LOGO_DOT_OFFSET = 3; // First dot offset inside the logo square
export const LOGO_DOT_STEP = 7; // Distance between adjacent dot centers
export const LOGO_TEXT_OFFSET = 26; // "europass" label x offset after the logo square
export const HEADER_TEXT_DY = 3; // Vertical baseline shift for header elements

// ─── Per-page footer layout ───────────────────────────────────────────────────
export const FOOTER_Y = 14; // Footer baseline Y (from bottom of page)
export const EUROPASS_COPYRIGHT =
  '© European Union, 2002–2026 | http://europass.cedefop.europa.eu' as const;
/** BCP 47 locale used to format the document date in the footer */
export const DATE_LOCALE = 'fr-BE' as const;

// ─── Section bar ─────────────────────────────────────────────────────────────
export const SECTION_BAR_PADDING_X = 5; // Text left-padding inside the bar
export const SECTION_BAR_PADDING_Y = 4; // Text bottom-padding inside the bar

// ─── Personal Skills layout ───────────────────────────────────────────────────
/** X gap between language name and its level/CECRL columns */
export const LANG_LEVEL_INDENT = 5;
/** Left indent applied to skill category rows */
export const SKILLS_INDENT = 6;

// ─── Europass color palette (values in 0–1 range) ────────────────────────────
export const COLOR = {
  primary: { r: 0, g: 0.2, b: 0.6 }, // #003399 Europass blue
  white: { r: 1, g: 1, b: 1 },
  dark: { r: 0.1, g: 0.1, b: 0.1 }, // body text
  gray: { r: 0.4, g: 0.4, b: 0.4 }, // secondary / label text
  lightGray: { r: 0.85, g: 0.85, b: 0.85 }, // separators
  yellow: { r: 1, g: 0.85, b: 0 }, // EU flag gold
} as const;

// ─── Two-column layout ───────────────────────────────────────────────────────
export const DATE_COL_X = MARGIN_LEFT;
export const DATE_COL_WIDTH = 90;
export const COL_GAP = 10;
export const CONTENT_COL_X = DATE_COL_X + DATE_COL_WIDTH + COL_GAP;
export const CONTENT_COL_W = PAGE_WIDTH - CONTENT_COL_X - MARGIN_RIGHT;

// ─── Async rendering ─────────────────────────────────────────────────────────
/** Yield to the main thread every N draw operations to avoid blocking the UI */
export const YIELD_EVERY_ITEMS = 16;

// ─── Category labels ─────────────────────────────────────────────────────────
export const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Bases de données',
  'cloud-devops': 'Cloud & DevOps',
  'ai-llm': 'IA & LLM',
  tools: 'Outils',
} as const satisfies Record<SkillCategory, string>;
