import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 font-display">Full-Stack Developer</h1>
      <p class="text-lg md:text-xl max-w-2xl mb-8 text-base-content/60">
        Building modern web applications with Angular, NestJS, and .NET. 7+ years of experience
        crafting scalable solutions.
      </p>
      <div class="flex gap-4">
        <button class="btn btn-primary rounded-full px-8">View Projects</button>
        <button class="btn btn-outline rounded-full px-8">Contact Me</button>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {}
