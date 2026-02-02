import { Component, inject, signal, computed, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime, map, startWith } from 'rxjs';
import { ThemeToggleComponent } from '@shared/components/theme-toggle';
import { ThemeService } from '@core/services';
import { SCROLL_THRESHOLD, SCROLL_THROTTLE_MS } from '@core/config';
import { NAV_LINKS } from '@data';
import {
  GithubIconComponent,
  MailIconComponent,
  TerminalIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    ThemeToggleComponent,
    GithubIconComponent,
    MailIconComponent,
    TerminalIconComponent,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly themeService = inject(ThemeService);
  protected readonly isScrolled = signal(false);
  protected readonly activeLink = signal('home');
  protected readonly navLinks = NAV_LINKS;

  // 🚀 Computed signal for header classes (reduces template bloat)
  protected readonly headerClasses = computed(() => {
    const scrolled = this.isScrolled();
    return {
      'px-4 pt-6': !scrolled,
      'px-0 pt-0': scrolled,
    };
  });

  // 🚀 Computed signal for nav classes (consolidates 27 class bindings)
  protected readonly navClasses = computed(() => {
    const scrolled = this.isScrolled();
    const dark = this.themeService.isDark();

    return {
      'w-full flex items-center justify-between transition-all duration-500 ease-out': true,
      // Size & padding
      'max-w-[960px]': !scrolled,
      'max-w-full': scrolled,
      'px-5 py-3': !scrolled,
      'px-8 md:px-16 py-4': scrolled,
      // Border radius
      'rounded-full': !scrolled,
      'rounded-none': scrolled,
      // Background & theme
      'glass-panel': dark && !scrolled,
      'glass-panel-light': !dark && !scrolled,
      'bg-surface-dark': dark && scrolled,
      'bg-white': !dark && scrolled,
      // Border
      'border-b': scrolled,
      'border-white/10': scrolled && dark,
      'border-slate-200': scrolled && !dark,
      // Shadow
      'shadow-lg': scrolled,
      'shadow-black/20': scrolled && dark,
      'shadow-black/5': scrolled && !dark,
    };
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(
          throttleTime(SCROLL_THROTTLE_MS, undefined, { leading: true, trailing: true }),
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
