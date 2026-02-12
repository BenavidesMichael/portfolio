import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 font-display">Full-Stack Developer</h1>
      <p class="text-lg md:text-xl max-w-2xl mb-8 text-slate-600 dark:text-slate-400">
        Building modern web applications with Angular, NestJS, and .NET. 7+ years of experience
        crafting scalable solutions.
      </p>
      <div class="flex gap-4">
        <button class="btn btn-primary rounded-full px-8 transition-all">View Projects</button>
        <button
          class="btn btn-outline rounded-full px-8 border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10"
        >
          Contact Me
        </button>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {}
