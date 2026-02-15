/**
 * Experience model — professional career entries
 */
export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly company: string;
  readonly dateRange: string;
  readonly isCurrent: boolean;
  readonly technologies: readonly string[];
  readonly description: string;
  readonly achievements: readonly string[];
  readonly responsibilities: readonly string[];
  readonly location?: string;
  readonly companyUrl?: string;
}
