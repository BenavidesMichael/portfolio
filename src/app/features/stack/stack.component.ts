import { Component, computed } from '@angular/core';
import { SKILLS } from '@data';

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
        @for (skill of skills(); track skill.name) {
          <div
            class="rounded-xl p-4 text-center transition-all hover:scale-105 bg-white dark:bg-surface-lighter shadow-md dark:shadow-none hover:shadow-lg dark:hover:bg-surface-dark"
          >
            {{ skill.name }}
          </div>
        }
      </div>
    </section>
  `,
})
export class StackSectionComponent {
  // Computed signal using SKILLS data (Single Source of Truth)
  protected readonly skills = computed(() => SKILLS.map((s) => ({ name: s.name })));
}
