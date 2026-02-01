import { Component, inject, signal, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime, map, startWith } from 'rxjs';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle';
import { ThemeService } from '../../../../core/services';
import {
  GithubIconComponent,
  MailIconComponent,
  TerminalIconComponent,
} from 'src/app/shared/components/icons';
import { NAV_LINKS, SCROLL_THRESHOLD } from 'src/app/data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent, GithubIconComponent, MailIconComponent, TerminalIconComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly themeService = inject(ThemeService);
  protected readonly isScrolled = signal(false);
  protected readonly activeLink = signal('home');
  protected readonly navLinks = NAV_LINKS;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(
          throttleTime(16, undefined, { leading: true, trailing: true }),
          map(() => window.scrollY > SCROLL_THRESHOLD),
          startWith(window.scrollY > SCROLL_THRESHOLD),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((scrolled) => this.isScrolled.set(scrolled));
    }
  }

  protected setActiveLink(link: string): void {
    this.activeLink.set(link);
  }
}
