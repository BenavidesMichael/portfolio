import { Component } from '@angular/core';
import { HomeIconComponent } from './home-icon.component';
import { UserIconComponent } from './user-icon.component';
import { CodeIconComponent } from './code-icon.component';
import { MailIconComponent } from './mail-icon.component';
import { TerminalIconComponent } from './terminal-icon.component';
import { GithubIconComponent } from './github-icon.component';
import { SunIconComponent } from './sun-icon.component';
import { MoonIconComponent } from './moon-icon.component';

@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [
    HomeIconComponent,
    UserIconComponent,
    CodeIconComponent,
    MailIconComponent,
    TerminalIconComponent,
    GithubIconComponent,
    SunIconComponent,
    MoonIconComponent,
  ],
  template: `
    <div class="p-8 min-h-screen bg-base-200">
      <h1 class="text-3xl font-bold mb-8">Icons Demo</h1>

      <!-- Size via font-size (inherits 1em) -->
      <section class="mb-8">
        <h2 class="text-xl mb-4">Sizes (via font-size)</h2>
        <div class="flex items-end gap-6">
          <span class="text-xs"><app-icon-home /> xs</span>
          <span class="text-sm"><app-icon-home /> sm</span>
          <span class="text-base"><app-icon-home /> base</span>
          <span class="text-lg"><app-icon-home /> lg</span>
          <span class="text-2xl"><app-icon-home /> 2xl</span>
          <span class="text-4xl"><app-icon-home /> 4xl</span>
        </div>
      </section>

      <!-- All Icons -->
      <section class="mb-8">
        <h2 class="text-xl mb-4">Available Icons</h2>
        <div class="flex gap-6 text-2xl">
          <div class="flex flex-col items-center gap-2">
            <app-icon-home />
            <span class="text-xs">home</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-user />
            <span class="text-xs">user</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-code />
            <span class="text-xs">code</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-mail />
            <span class="text-xs">mail</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-terminal />
            <span class="text-xs">terminal</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-github />
            <span class="text-xs">github</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-sun />
            <span class="text-xs">sun</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <app-icon-moon />
            <span class="text-xs">moon</span>
          </div>
        </div>
      </section>

      <!-- Colors (inherits currentColor) -->
      <section>
        <h2 class="text-xl mb-4">Colors (via text color)</h2>
        <div class="flex gap-4 text-3xl">
          <span class="text-primary"><app-icon-github /></span>
          <span class="text-secondary"><app-icon-github /></span>
          <span class="text-accent"><app-icon-github /></span>
          <span class="text-success"><app-icon-github /></span>
          <span class="text-warning"><app-icon-github /></span>
          <span class="text-error"><app-icon-github /></span>
        </div>
      </section>
    </div>
  `,
})
export class IconsDemoComponent {}
