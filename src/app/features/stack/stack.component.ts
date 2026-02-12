import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SKILLS } from '@data';

@Component({
  selector: 'app-stack-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="min-h-screen flex flex-col justify-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-8">Tech Stack</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @for (skill of skills; track skill.name) {
          <div
            class="card card-compact bg-base-200 shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <div class="card-body items-center">
              <span class="font-medium">{{ skill.name }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class StackSectionComponent {
  protected readonly skills = SKILLS.map((s) => ({ name: s.name }));
}
