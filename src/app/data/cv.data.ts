/**
 * CV-specific data not covered by experience/skills data files
 * Used by CvPdfService and Education/Certifications sections
 */

export const PERSONAL_INFO = {
  firstName: 'Michael',
  lastName: 'Benavides',
  fullName: 'Michael Benavides',
  title: 'Developpeur Full Stack Senior',
  subtitle: 'Angular + NestJS',
  location: 'Bruxelles, Belgique',
  nationality: 'Belge',
  email: 'benavides.michael.munoz@gmail.com',
  linkedin: 'https://www.linkedin.com/in/benavides-michael-a38062a9/',
  linkedinHandle: 'benavides-michael-a38062a9',
  github: 'https://github.com/BenavidesMichael',
  githubHandle: 'BenavidesMichael',
  portfolioUrl: 'https://benavidesmichael.github.io/portfolio/',
  yearsOfExperience: 7,
} as const;

/** Profile stats displayed in the About section */
export const PROFILE_STATS = {
  yearsExp: PERSONAL_INFO.yearsOfExperience,
  projects: 50,
  clients: 15,
} as const;

export const PROFILE_TEXT =
  "Developpeur Full Stack TypeScript, je travaille au quotidien avec NestJS cote back et Angular cote front. Passionne par l'ecosysteme des agents IA, je me suis specialise dans la configuration et l'integration de Claude Code en contexte d'equipe : conception de rules, skills et commandes custom pour adapter l'agent aux conventions de chaque projet. Issu du monde .NET Core, j'ai su evoluer et m'adapter aux besoins du terrain. Si vous cherchez un developpeur qui code et qui sait tirer parti de l'IA pour livrer mieux et plus vite — je suis votre dev.";

export interface Education {
  readonly title: string;
  readonly institution: string;
  readonly location: string;
  readonly startYear: string;
  readonly endYear: string;
  readonly specialization?: string;
}

export const EDUCATION: readonly Education[] = [
  {
    title: 'Bachelier en Informatique de Gestion',
    institution: 'EPHEC (Ecole Pratique des Hautes Etudes Commerciales)',
    location: 'Bruxelles, Belgique',
    startYear: '2013',
    endYear: '2020',
    specialization:
      'Developpement web, Bases de donnees, Algorithmique, Gestion de projet, Architecture logicielle, Reseaux',
  },
  {
    title: '.NET et SQL Database',
    institution: 'Evoliris',
    location: 'Bruxelles, Belgique',
    startYear: '2016',
    endYear: '2016',
  },
] as const;

export interface Certification {
  readonly name: string;
  readonly provider: string;
  readonly date: string;
  readonly id?: string;
  readonly url?: string;
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    provider: 'Microsoft',
    date: '12/2022',
    url: 'https://learn.microsoft.com/fr-fr/users/benavidesmichael/',
  },
  {
    name: 'Azure AZ-900 Prep. Cert.: Microsoft Azure Fundamentals',
    provider: 'LinkedIn Learning',
    date: '01/2022',
  },
  {
    name: 'Curso de Docker',
    provider: 'Platzi',
    date: '05/2023',
    id: 'a1821e5a-65c4-401e-a1c3-cee10edd5fa3',
  },
  {
    name: 'Azure DevOps: Flujos de CI/CD',
    provider: 'Platzi',
    date: '01/2023',
  },
  {
    name: 'Curso Profesional de Git y GitHub',
    provider: 'Platzi',
    date: '01/2023',
  },
  {
    name: 'Aprende Oracle PL/SQL desde Cero',
    provider: 'Udemy',
    date: '11/2021',
  },
  {
    name: 'Curso de Angular',
    provider: 'Platzi',
    date: '10/2020',
    id: '5d120c5d-d9ff-4225-9a62-b8211814fbf0',
  },
  {
    name: '70-483 : Programming in C#',
    provider: 'Microsoft',
    date: '2018',
  },
  {
    name: '70-486 : Developing ASP.NET MVC Web Applications',
    provider: 'Microsoft',
    date: '2018',
  },
  {
    name: '70-487 : Developing Microsoft Azure and Web Services',
    provider: 'Microsoft',
    date: '2018',
  },
  {
    name: 'Trainee — Microsoft Innovation Center Brussels',
    provider: 'Microsoft',
    date: '2018',
  },
] as const;

export interface Language {
  readonly name: string;
  readonly level: string;
  readonly cecrl: string;
}

export const LANGUAGES: readonly Language[] = [
  { name: 'Francais', level: 'Bilingue', cecrl: 'C2' },
  { name: 'Espagnol', level: 'Bilingue', cecrl: 'C2' },
  { name: 'Anglais', level: 'Elementaire', cecrl: 'B1' },
] as const;

export const METHODOLOGIES: readonly string[] = [
  'Agile / Scrum',
  'Clean Architecture / CQRS',
  'TDD — Test Driven Development',
  'Clean Code / SOLID',
  'REST API / SOAP / GraphQL',
  'OAuth2 / SSO / RBAC',
  'Conventional Commits',
] as const;
