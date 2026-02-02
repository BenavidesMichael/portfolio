import { Component } from '@angular/core';

/**
 * Contact section component
 * Contact information and call-to-action
 */
@Component({
  selector: 'app-contact-section',
  template: `
    <section id="contact" class="min-h-screen flex flex-col justify-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-8">Contact</h2>
      <div class="rounded-2xl p-8 bg-white dark:bg-surface-dark shadow-xl dark:shadow-none">
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300">
          Ready to collaborate? Send me a message!
        </p>
      </div>
    </section>
  `,
})
export class ContactSectionComponent {}
