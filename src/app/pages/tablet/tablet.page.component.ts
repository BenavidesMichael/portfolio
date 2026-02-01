import { Component } from '@angular/core';
import { SidebarNavComponent } from './components/sidebar-nav';
import { HeaderComponent } from './components/header';

@Component({
  selector: 'app-tablet-page',
  standalone: true,
  imports: [SidebarNavComponent, HeaderComponent],
  templateUrl: './tablet.page.component.html',
})
export class TabletPageComponent {}
