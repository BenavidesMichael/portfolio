import type { NavLink } from '../models';

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Accueil', href: '#home' },
  { label: 'A propos', href: '#about' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

export const NAV_LINKS_WITH_ICONS: readonly NavLink[] = [
  { label: 'Accueil', href: '#home', route: '/', icon: 'home' },
  { label: 'A propos', href: '#about', route: '/about', icon: 'user' },
  { label: 'Parcours', href: '#experience', route: '/experience', icon: 'briefcase' },
  { label: 'Skills', href: '#skills', route: '/skills', icon: 'code' },
  { label: 'Contact', href: '#contact', route: '/contact', icon: 'mail' },
] as const;
