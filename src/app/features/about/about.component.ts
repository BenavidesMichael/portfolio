import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="min-h-screen flex flex-col justify-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-8">About</h2>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <p class="text-lg md:text-xl leading-relaxed text-base-content/70">
            Passionate full-stack developer with expertise in building modern, scalable web
            applications. Specialized in Angular, NestJS, and .NET ecosystems with a strong focus on
            clean architecture and best practices.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {}
