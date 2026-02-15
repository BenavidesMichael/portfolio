/** Available icon identifiers for navigation components */
export type NavIconName = 'home' | 'user' | 'code' | 'mail' | 'briefcase';

export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly route?: string;
  readonly icon?: NavIconName;
}
