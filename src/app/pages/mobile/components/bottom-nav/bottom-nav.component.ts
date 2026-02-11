import { Component, signal } from '@angular/core';
import { NAV_LINKS_WITH_ICONS } from '@data';
import type { NavLink } from '@models';
import {
  CodeIconComponent,
  HomeIconComponent,
  MailIconComponent,
  UserIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-bottom-nav',
  imports: [HomeIconComponent, MailIconComponent, UserIconComponent, CodeIconComponent],
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  protected readonly activeLink = signal('home');
  protected readonly navItems: readonly NavLink[] = NAV_LINKS_WITH_ICONS;

  protected setActiveLink(link: string): void {
    this.activeLink.set(link);
  }
}
