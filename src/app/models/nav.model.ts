/** Available icon identifiers for navigation components */
export type NavIconName = 'home' | 'user' | 'code' | 'mail';

export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly icon?: NavIconName;
}
