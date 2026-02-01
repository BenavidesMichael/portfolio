import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../../core/services';

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#home', icon: 'home' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Stack', href: '#stack', icon: 'code' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
] as const;

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly activeLink = signal('home');
  protected readonly navItems = NAV_ITEMS;

  protected setActiveLink(link: string): void {
    this.activeLink.set(link);
  }
}
