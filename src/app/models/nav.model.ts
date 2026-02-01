/**
 * Navigation link model
 */
export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly icon?: string; // Optional icon name for mobile/tablet navigation
}
