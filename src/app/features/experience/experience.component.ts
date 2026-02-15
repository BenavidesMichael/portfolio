import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ClockIconComponent,
  BriefcaseIconComponent,
  ChevronRightIconComponent,
} from '@shared/components/icons';

const EXPERIENCES = [
  {
    id: 'lead-dev-techcorp',
    title: 'Lead Developer Full Stack',
    company: 'TechCorp Solutions',
    dateRange: '2022 - Present',
    isCurrent: true,
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
    description: '',
    achievements: [],
  },
  {
    id: 'senior-dev-digital',
    title: 'Developpeur Full Stack Senior',
    company: 'Digital Innovations',
    dateRange: '2020 - 2022',
    isCurrent: false,
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'TypeScript', 'Docker'],
    description: '',
    achievements: [],
  },
  {
    id: 'fullstack-webstart',
    title: 'Developpeur Full Stack',
    company: 'WebStart Agency',
    dateRange: '2018 - 2020',
    isCurrent: false,
    technologies: ['Angular', 'Express', 'MySQL', '.NET Core', 'Azure', 'RabbitMQ'],
    description: '',
    achievements: [],
  },
  {
    id: 'backend-first',
    title: 'Developpeur Backend',
    company: 'StartUp Lab',
    dateRange: '2017 - 2018',
    isCurrent: false,
    technologies: ['.NET', 'SQL Server', 'C#', 'Azure DevOps'],
    description: '',
    achievements: [],
  },
] as const;

@Component({
  selector: 'app-experience-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClockIconComponent, BriefcaseIconComponent, ChevronRightIconComponent],
  templateUrl: './experience.component.html',
})
export class ExperienceSectionComponent {
  protected readonly experiences = EXPERIENCES;
}
