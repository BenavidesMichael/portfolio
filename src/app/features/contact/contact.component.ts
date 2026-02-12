import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="min-h-screen flex flex-col justify-center">
      <h2 class="text-3xl md:text-5xl font-bold mb-8">Contact</h2>
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <p class="text-lg md:text-xl text-base-content/70">
            Ready to collaborate? Send me a message!
          </p>
        </div>
      </div>
    </section>
  `,
})
export class ContactSectionComponent {}
