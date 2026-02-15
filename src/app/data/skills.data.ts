import type { Skill, SkillCategory } from '../models';

export const SKILLS: readonly Skill[] = [
  // Frontend
  { name: 'Angular', category: 'frontend', level: 'expert', progress: 95 },
  { name: 'React', category: 'frontend', level: 'expert', progress: 90 },
  { name: 'TypeScript', category: 'frontend', level: 'expert', progress: 95 },
  { name: 'Tailwind CSS', category: 'frontend', level: 'expert', progress: 90 },

  // Backend
  { name: 'NestJS', category: 'backend', level: 'expert', progress: 90 },
  { name: 'Node.js', category: 'backend', level: 'expert', progress: 88 },
  { name: 'Express', category: 'backend', level: 'advanced', progress: 80 },
  { name: '.NET Core', category: 'backend', level: 'advanced', progress: 75 },

  // Database
  { name: 'PostgreSQL', category: 'database', level: 'advanced', progress: 82 },
  { name: 'MongoDB', category: 'database', level: 'advanced', progress: 78 },
] as const;

/** Filter categories available in the UI */
export const SKILL_FILTER_CATEGORIES: readonly { label: string; value: SkillCategory | 'all' }[] = [
  { label: 'Tous', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Database', value: 'database' },
] as const;
