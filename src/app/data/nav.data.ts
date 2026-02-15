import type { NavLink } from '../models';

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Accueil', href: '#home' },
  { label: 'A propos', href: '#about' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

export const NAV_LINKS_WITH_ICONS: readonly NavLink[] = [
  { label: 'Accueil', href: '#home', icon: 'home' },
  { label: 'A propos', href: '#about', icon: 'user' },
  { label: 'Parcours', href: '#experience', icon: 'briefcase' },
  { label: 'Skills', href: '#skills', icon: 'code' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;
