import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeToggleComponent } from '@shared/components/theme-toggle';
import { NavIconComponent } from '@shared/components/nav-icon';
import { NAV_LINKS_WITH_ICONS } from '@data';
import type { NavLink } from '@models';
import {
  HomeIconComponent,
  GithubIconComponent,
  LinkedinIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-sidebar-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoPipe,
    ThemeToggleComponent,
    NavIconComponent,
    HomeIconComponent,
    GithubIconComponent,
    LinkedinIconComponent,
  ],
  templateUrl: './sidebar-nav.component.html',
})
export class SidebarNavComponent {
  private readonly scroller = inject(ViewportScroller);

  private readonly activeSection = signal('home');
  protected readonly navItems = NAV_LINKS_WITH_ICONS;

  // Single signal read per render cycle — replaces isActive() double-call in template
  protected readonly activeHref = computed(() => `#${this.activeSection()}`);

  protected navigate(item: NavLink): void {
    const section = item.href.replace('#', '');
    this.activeSection.set(section);
    this.scroller.scrollToAnchor(section);
  }
}
