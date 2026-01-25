export const Theme = {
  Light: 'light',
  Dark: 'dracula',
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export const THEME_KEY = 'portfolio-theme';

export const Breakpoint = {
  Mobile: '(max-width: 767px)',
  Tablet: '(min-width: 768px) and (max-width: 1023px)',
  Desktop: '(min-width: 1024px)',
} as const;
