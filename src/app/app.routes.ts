import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.page.component').then((m) => m.HomeSectionsComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about').then((m) => m.AboutSectionComponent),
  },
  {
    path: 'experience',
    pathMatch: 'full',
    loadComponent: () => import('./features/experience').then((m) => m.ExperienceSectionComponent),
  },
  {
    path: 'experience/:id',
    loadComponent: () =>
      import('./features/experience/detail').then((m) => m.ExperienceDetailComponent),
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills').then((m) => m.SkillsSectionComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact').then((m) => m.ContactSectionComponent),
  },
];
