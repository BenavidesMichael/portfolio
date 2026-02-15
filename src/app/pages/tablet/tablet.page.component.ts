import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavComponent } from './components/sidebar-nav';

@Component({
  selector: 'app-tablet-page',
  imports: [RouterOutlet, SidebarNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tablet.page.component.html',
})
export class TabletPageComponent {}
