/**
 * Mission or project within a professional experience
 */
export interface ExperienceMission {
  readonly title: string;
  readonly client?: string;
  readonly sector?: string;
  readonly description?: string;
  readonly achievements: readonly string[];
  readonly technologies: readonly string[];
}

/**
 * Experience model — professional career entries with nested missions/projects
 */
export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly company: string;
  readonly companyDescription?: string;
  readonly dateRange: string;
  readonly isCurrent: boolean;
  readonly contractType: string;
  readonly sector: string;
  readonly location: string;
  readonly technologies: readonly string[];
  readonly description: string;
  readonly missions: readonly ExperienceMission[];
}
