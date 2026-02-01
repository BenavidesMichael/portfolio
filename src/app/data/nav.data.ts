import type { NavLink } from '../models';

/**
 * Main navigation links (Desktop navbar)
 */
export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
] as const;

/**
 * Navigation links with icons (Mobile/Tablet)
 */
export const NAV_LINKS_WITH_ICONS: readonly NavLink[] = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Stack', href: '#stack', icon: 'code' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;
