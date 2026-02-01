import { Component } from '@angular/core';
import { SidebarNavComponent } from './components/sidebar-nav';

@Component({
  selector: 'app-tablet-layout',
  standalone: true,
  imports: [SidebarNavComponent],
  template: `
    <app-sidebar-nav />
    <main class="pl-64 pt-6">
      <ng-content />
    </main>
  `,
})
export class TabletLayoutComponent {}
