import type { Experience } from '@models';

export const EXPERIENCES: readonly Experience[] = [
  {
    id: 'lead-dev-techcorp',
    title: 'Lead Developer Full Stack',
    company: 'TechCorp Solutions',
    dateRange: '2022 - Present',
    isCurrent: true,
    location: 'Bruxelles, Belgique',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
    description:
      "Direction technique d'une equipe de 6 developpeurs sur une plateforme SaaS B2B. Mise en place de l'architecture microservices et du pipeline CI/CD. Migration reussie d'un monolithe .NET vers Angular + NestJS.",
    responsibilities: [
      'Architecture et design technique de la plateforme',
      "Code review et mentorat de l'equipe",
      'Mise en place du pipeline CI/CD (GitHub Actions + Docker)',
      'Migration progressive du monolithe vers des microservices',
      'Collaboration directe avec le Product Owner pour le backlog refinement',
    ],
    achievements: [
      'Reduction de 40% du temps de deploiement grace au pipeline CI/CD',
      'Migration de 80% du monolithe .NET vers Angular + NestJS',
      'Amelioration de la couverture de tests de 30% a 85%',
      'Mise en place du monitoring avec Grafana + Prometheus',
    ],
  },
  {
    id: 'senior-dev-digital',
    title: 'Developpeur Full Stack Senior',
    company: 'Digital Innovations',
    dateRange: '2020 - 2022',
    isCurrent: false,
    location: 'Bruxelles, Belgique',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'TypeScript', 'Docker'],
    description:
      'Developpement de solutions web sur mesure pour des clients grands comptes. Intervention sur des projets complexes avec des contraintes de performance et de scalabilite.',
    responsibilities: [
      'Developpement full stack de nouvelles fonctionnalites',
      'Optimisation des performances frontend et backend',
      "Integration d'APIs tierces (Stripe, SendGrid, Twilio)",
      'Participation aux sessions de pair programming',
    ],
    achievements: [
      'Livraison de 12 projets clients dans les delais',
      'Reduction du temps de chargement de 60% sur le projet principal',
      "Implementation d'un systeme de cache Redis reducissant la charge serveur de 50%",
    ],
  },
  {
    id: 'fullstack-webstart',
    title: 'Developpeur Full Stack',
    company: 'WebStart Agency',
    dateRange: '2018 - 2020',
    isCurrent: false,
    location: 'Liege, Belgique',
    technologies: ['Angular', 'Express', 'MySQL', '.NET Core', 'Azure', 'RabbitMQ'],
    description:
      "Developpement d'applications web pour des PME. Transition progressive de .NET vers le stack TypeScript (Angular + Express).",
    responsibilities: [
      "Developpement d'applications web responsives",
      'Gestion de bases de donnees relationnelles',
      'Deploiement et maintenance sur Azure',
      'Support technique et correction de bugs',
    ],
    achievements: [
      'Premiere migration reussie de .NET vers Angular',
      "Mise en place d'une architecture event-driven avec RabbitMQ",
      'Formation de 2 developpeurs juniors',
    ],
  },
  {
    id: 'backend-first',
    title: 'Developpeur Backend',
    company: 'StartUp Lab',
    dateRange: '2017 - 2018',
    isCurrent: false,
    location: 'Bruxelles, Belgique',
    technologies: ['.NET', 'SQL Server', 'C#', 'Azure DevOps'],
    description:
      "Premier poste en tant que developpeur backend dans une startup. Developpement d'APIs RESTful et de services backend en C# / .NET.",
    responsibilities: [
      "Developpement d'APIs RESTful en C# / .NET",
      'Conception et optimisation de schemas de base de donnees',
      'Ecriture de requetes SQL complexes',
      'Participation aux ceremonies Agile (daily, sprint review)',
    ],
    achievements: [
      "Developpement d'une API de gestion de commandes traitant 10k requetes/jour",
      'Automatisation des deployements avec Azure DevOps pipelines',
    ],
  },
] as const;

/**
 * Find an experience entry by its unique ID
 */
export function findExperienceById(id: string): Experience | undefined {
  return EXPERIENCES.find((exp) => exp.id === id);
}
