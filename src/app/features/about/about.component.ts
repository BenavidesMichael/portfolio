import { Component } from '@angular/core';

/**
 * About section component
 * Introduction and background information
 */
@Component({
  selector: 'app-about-section',
  imports: [],
  template: `
    <section id="about" class="min-h-screen flex flex-col justify-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-8">About</h2>
      <div
        class="rounded-2xl p-8 transition-colors bg-white dark:bg-surface-dark shadow-xl dark:shadow-none"
      >
        <p class="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
          Passionate full-stack developer with expertise in building modern, scalable web
          applications. Specialized in Angular, NestJS, and .NET ecosystems with a strong focus on
          clean architecture and best practices.
        </p>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {}
