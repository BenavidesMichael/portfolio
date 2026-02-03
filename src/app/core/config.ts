export const Theme = {
  Light: 'light',
  Dark: 'dracula',
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export const THEME_KEY = 'portfolio-theme';

export const Device = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
} as const;

export type DeviceType = (typeof Device)[keyof typeof Device];

export const Breakpoint = {
  Mobile: '(max-width: 639px)',
  Tablet: '(min-width: 640px) and (max-width: 1023px)',
  Desktop: '(min-width: 1024px)',
} as const;

export const SCROLL_THRESHOLD = 50;
export const SCROLL_THROTTLE_MS = 16; // 60 FPS (1000ms / 60 ≈ 16ms)
export const CURRENT_YEAR = new Date().getFullYear();

export const BrandColors = {
  Primary: '#13a4ec',
  PrimaryDark: '#0f83bd',
} as const;

export type BrandColor = (typeof BrandColors)[keyof typeof BrandColors];
