import type { Skill, SkillCategory } from '../models';
import { TECH } from './technology.data';

export const SKILLS: readonly Skill[] = [
  // Frontend
  {
    name: TECH.Angular,
    category: 'frontend',
    level: 'advanced',
    progress: 85,
    yearsOfExperience: 4,
  },
  {
    name: TECH.TypeScript,
    category: 'frontend',
    level: 'advanced',
    progress: 85,
    yearsOfExperience: 4,
  },
  {
    name: TECH.JavaScript,
    category: 'frontend',
    level: 'advanced',
    progress: 85,
    yearsOfExperience: 6,
  },
  { name: TECH.RxJS, category: 'frontend', level: 'advanced', progress: 80, yearsOfExperience: 3 },
  {
    name: TECH.AngularMaterial,
    category: 'frontend',
    level: 'advanced',
    progress: 80,
    yearsOfExperience: 3,
  },
  {
    name: TECH.TailwindCSS,
    category: 'frontend',
    level: 'advanced',
    progress: 80,
    yearsOfExperience: 3,
  },
  {
    name: TECH.HTML_CSS_SASS,
    category: 'frontend',
    level: 'advanced',
    progress: 85,
    yearsOfExperience: 6,
  },

  // Backend
  { name: TECH.NestJS, category: 'backend', level: 'advanced', progress: 80, yearsOfExperience: 2 },
  {
    name: TECH.ASPNETCore,
    category: 'backend',
    level: 'advanced',
    progress: 85,
    yearsOfExperience: 5,
  },
  {
    name: TECH.EntityFrameworkCore,
    category: 'backend',
    level: 'advanced',
    progress: 82,
    yearsOfExperience: 4,
  },
  { name: TECH.CSharp, category: 'backend', level: 'advanced', progress: 85, yearsOfExperience: 5 },
  {
    name: TECH.Sequelize,
    category: 'backend',
    level: 'intermediate',
    progress: 65,
    yearsOfExperience: 2,
  },
  {
    name: TECH.SignalR,
    category: 'backend',
    level: 'intermediate',
    progress: 65,
    yearsOfExperience: 2,
  },
  {
    name: TECH.PassportJS,
    category: 'backend',
    level: 'intermediate',
    progress: 65,
    yearsOfExperience: 2,
  },

  // Database
  { name: TECH.MSSQLServer, category: 'database', level: 'advanced', progress: 82 },
  { name: TECH.OracleDB, category: 'database', level: 'intermediate', progress: 65 },
  { name: TECH.IBMDB2, category: 'database', level: 'intermediate', progress: 60 },
  { name: TECH.AzureSQL, category: 'database', level: 'intermediate', progress: 65 },

  // Cloud & DevOps
  { name: TECH.Azure, category: 'cloud-devops', level: 'intermediate', progress: 65 },
  { name: TECH.Git, category: 'cloud-devops', level: 'advanced', progress: 85 },
  { name: TECH.ElasticAPM, category: 'cloud-devops', level: 'intermediate', progress: 60 },
  { name: TECH.SonarQube, category: 'cloud-devops', level: 'intermediate', progress: 60 },
  { name: TECH.Swagger, category: 'cloud-devops', level: 'advanced', progress: 82 },
  { name: TECH.Docker, category: 'cloud-devops', level: 'intermediate', progress: 60 },

  // AI & LLM
  { name: TECH.ClaudeCode, category: 'ai-llm', level: 'advanced', progress: 80 },
  { name: TECH.PromptEngineering, category: 'ai-llm', level: 'advanced', progress: 80 },
  { name: TECH.CustomRulesSkills, category: 'ai-llm', level: 'advanced', progress: 80 },

  // Tools
  { name: TECH.ESLint, category: 'tools', level: 'advanced', progress: 85 },
  { name: TECH.Husky, category: 'tools', level: 'advanced', progress: 82 },
  { name: TECH.VSCode, category: 'tools', level: 'expert', progress: 92 },
  { name: TECH.Jest, category: 'tools', level: 'advanced', progress: 78 },
  { name: TECH.Cypress, category: 'tools', level: 'intermediate', progress: 65 },
] as const;

/** Filter categories available in the UI */
export const SKILL_FILTER_CATEGORIES: readonly {
  translationKey: string;
  value: SkillCategory | 'all';
}[] = [
  { translationKey: 'skills.filter-all', value: 'all' },
  { translationKey: 'skills.filter-frontend', value: 'frontend' },
  { translationKey: 'skills.filter-backend', value: 'backend' },
  { translationKey: 'skills.filter-db', value: 'database' },
  { translationKey: 'skills.filter-cloud', value: 'cloud-devops' },
  { translationKey: 'skills.filter-ia', value: 'ai-llm' },
  { translationKey: 'skills.filter-tools', value: 'tools' },
] as const;
