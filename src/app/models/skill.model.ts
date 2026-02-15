/**
 * Skill category types
 */
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'soft-skills';

/**
 * Skill proficiency level
 */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Skill model
 */
export interface Skill {
  readonly name: string;
  readonly category: SkillCategory;
  readonly level: SkillLevel;
  readonly progress: number;
  readonly icon?: string;
}
