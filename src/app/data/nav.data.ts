import type { NavLink } from '../models';

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'nav.home', href: '#home' },
  { label: 'nav.about', href: '#about' },
  { label: 'nav.experience', href: '#experience' },
  { label: 'nav.skills', href: '#skills' },
  { label: 'nav.contact', href: '#contact' },
] as const;

export const NAV_LINKS_WITH_ICONS: readonly NavLink[] = [
  { label: 'nav.home', href: '#home', route: '/', icon: 'home' },
  { label: 'nav.about', href: '#about', route: '/about', icon: 'user' },
  { label: 'nav.experience', href: '#experience', route: '/experience', icon: 'briefcase' },
  { label: 'nav.skills', href: '#skills', route: '/skills', icon: 'code' },
  { label: 'nav.contact', href: '#contact', route: '/contact', icon: 'mail' },
] as const;
