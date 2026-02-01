import type { NavLink } from '../models';

/**
 * Main navigation links
 */
export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
] as const;

/**
 * Scroll threshold for navbar state change (in pixels)
 */
export const SCROLL_THRESHOLD = 50;
