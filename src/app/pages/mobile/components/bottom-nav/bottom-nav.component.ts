import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeIconComponent, MailIconComponent, UserIconComponent, CodeIconComponent],
  templateUrl: './bottom-nav.component.html',
  host: {
    class: 'dock dock-sm',
    role: 'navigation',
    'aria-label': 'Mobile navigation',
  },
})
export class BottomNavComponent {
  protected readonly activeLink = signal('home');
  protected readonly navItems: readonly NavLink[] = NAV_LINKS_WITH_ICONS;

  protected navigate(item: NavLink): void {
    this.activeLink.set(item.label.toLowerCase());
    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
  }
}
