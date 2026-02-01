import { Component } from '@angular/core';
import { SidebarNavComponent } from './components/sidebar-nav';

@Component({
  selector: 'app-tablet-page',
  standalone: true,
  imports: [SidebarNavComponent],
  templateUrl: './tablet.page.component.html',
})
export class TabletPageComponent {}
