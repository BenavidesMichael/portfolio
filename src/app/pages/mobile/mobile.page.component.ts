import { Component } from '@angular/core';
import { BottomNavComponent } from './components/bottom-nav';

@Component({
  selector: 'app-mobile-page',
  standalone: true,
  imports: [BottomNavComponent],
  template: `
    <app-bottom-nav />
    <main class="pb-20">
      <ng-content />
    </main>
  `,
})
export class MobilePageComponent {}
