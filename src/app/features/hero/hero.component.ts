import { Component } from '@angular/core';

/**
 * Hero section component
 * Main landing section with introduction and CTA buttons
 */
@Component({
  selector: 'app-hero-section',
  imports: [],
  template: `
    <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 font-display">Full-Stack Developer</h1>
      <p class="text-lg md:text-xl max-w-2xl mb-8 text-slate-600 dark:text-slate-400">
        Building modern web applications with Angular, NestJS, and .NET. 7+ years of experience
        crafting scalable solutions.
      </p>
      <div class="flex gap-4">
        <button
          class="btn rounded-full px-8 transition-all bg-primary-brand hover:bg-primary-brand-dark text-white border-primary-brand"
        >
          View Projects
        </button>
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
