import { Component, inject, signal } from '@angular/core';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle';
import { ThemeService } from '../../../../core/services';

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', href: '#home', icon: 'home' },
  { label: 'Evolution', href: '#about', icon: 'evolution' },
  { label: 'Tech Stack', href: '#stack', icon: 'code' },
  { label: 'Projects', href: '#projects', icon: 'folder' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './sidebar-nav.component.html',
})
export class SidebarNavComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly activeLink = signal('home');
  protected readonly navItems = NAV_ITEMS;

  protected setActiveLink(link: string): void {
    this.activeLink.set(link);
  }

  protected isActive(href: string): boolean {
    const section = href.replace('#', '');
    return this.activeLink() === section;
  }
}
