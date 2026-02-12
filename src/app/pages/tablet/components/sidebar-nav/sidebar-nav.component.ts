import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleComponent } from '@shared/components/theme-toggle';
import { NAV_LINKS_WITH_ICONS } from '@data';
import type { NavLink } from '@models';
import {
  CodeIconComponent,
  HomeIconComponent,
  MailIconComponent,
  GithubIconComponent,
  LinkedinIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-sidebar-nav',
  imports: [
    ThemeToggleComponent,
    HomeIconComponent,
    CodeIconComponent,
    MailIconComponent,
    GithubIconComponent,
    LinkedinIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-nav.component.html',
})
export class SidebarNavComponent {
  protected readonly activeLink = signal('home');
  protected readonly navItems: readonly NavLink[] = NAV_LINKS_WITH_ICONS;

  protected setActiveLink(link: string): void {
    this.activeLink.set(link);
  }

  protected isActive(href: string): boolean {
    const section = href.replace('#', '');
    return this.activeLink() === section;
  }
}
