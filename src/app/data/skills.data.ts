import type { Skill } from '../models';

/**
 * Technical skills data
 */
export const SKILLS: readonly Skill[] = [
  // Frontend
  { name: 'Angular', category: 'frontend', level: 'expert' },
  { name: 'TypeScript', category: 'frontend', level: 'expert' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
  { name: 'RxJS', category: 'frontend', level: 'advanced' },

  // Backend
  { name: 'Node.js', category: 'backend', level: 'intermediate' },
  { name: 'NestJS', category: 'backend', level: 'intermediate' },

  // Tools
  { name: 'Git', category: 'tools', level: 'advanced' },
  { name: 'Docker', category: 'tools', level: 'intermediate' },
] as const;

/**
 * Get skills filtered by category
 */
export const getSkillsByCategory = (category: Skill['category']): readonly Skill[] => {
  return SKILLS.filter((skill) => skill.category === category);
};
