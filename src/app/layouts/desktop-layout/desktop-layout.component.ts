import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar';

@Component({
  selector: 'app-desktop-layout',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <app-navbar />
    <main class="pt-28">
      <ng-content />
    </main>
  `,
})
export class DesktopLayoutComponent {}
