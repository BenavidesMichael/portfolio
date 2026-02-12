import type { NavLink } from '../models';

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
] as const;

export const NAV_LINKS_WITH_ICONS: readonly NavLink[] = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Stack', href: '#stack', icon: 'code' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;
