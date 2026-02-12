import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NAV_LINKS_WITH_ICONS } from '@data';
import type { NavLink } from '@models';
import { NavIconComponent } from '@shared/components';

@Component({
  selector: 'app-bottom-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavIconComponent],
  templateUrl: './bottom-nav.component.html',
  host: {
    class: 'dock dock-sm',
    role: 'navigation',
    'aria-label': 'Mobile navigation',
  },
})
export class BottomNavComponent {
  private readonly scroller = inject(ViewportScroller);

  protected readonly activeSection = signal('home');
  protected readonly navItems = NAV_LINKS_WITH_ICONS;

  protected navigate(item: NavLink): void {
    const section = item.href.replace('#', '');
    this.activeSection.set(section);
    this.scroller.scrollToAnchor(section);
  }

  protected isActive(item: NavLink): boolean {
    return this.activeSection() === item.href.replace('#', '');
  }
}
