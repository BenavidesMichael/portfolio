import { Component } from '@angular/core';

/**
 * Tech Stack section component
 * Displays technical skills and technologies
 */
@Component({
  selector: 'app-stack-section',
  template: `
    <section id="stack" class="min-h-screen flex flex-col justify-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-8">Tech Stack</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @for (
          tech of [
            'Angular',
            'NestJS',
            '.NET',
            'TypeScript',
            'PostgreSQL',
            'Docker',
            'Azure',
            'Git',
          ];
          track tech
        ) {
          <div
            class="rounded-xl p-4 text-center transition-all hover:scale-105 bg-white dark:bg-surface-lighter shadow-md dark:shadow-none hover:shadow-lg dark:hover:bg-surface-dark"
          >
            {{ tech }}
          </div>
        }
      </div>
    </section>
  `,
})
export class StackSectionComponent {}
