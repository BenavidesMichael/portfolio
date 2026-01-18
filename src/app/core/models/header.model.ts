export interface HeaderNavLink {
  href: string;
  label: string;
  isPrimary: boolean;
}

export interface HeaderData {
  logo: { text: string; subtext: string };
  navLinks: HeaderNavLink[];
}
