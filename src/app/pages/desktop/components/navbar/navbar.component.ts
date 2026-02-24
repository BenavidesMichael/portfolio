import { Component, inject, signal, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NEVER, fromEvent, throttleTime, map, startWith } from 'rxjs';
import { ThemeToggleComponent } from '@shared/components/theme-toggle';
import { SCROLL_THRESHOLD, SCROLL_THROTTLE_MS } from '@core/config';
import { NAV_LINKS } from '@data';
import {
  GithubIconComponent,
  MailIconComponent,
  TerminalIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent, GithubIconComponent, MailIconComponent, TerminalIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly scroll$ = isPlatformBrowser(this.platformId)
    ? fromEvent(window, 'scroll', { passive: true }).pipe(
        throttleTime(SCROLL_THROTTLE_MS, undefined, { leading: true, trailing: true }),
        map(() => window.scrollY > SCROLL_THRESHOLD),
        startWith(window.scrollY > SCROLL_THRESHOLD),
      )
    : NEVER.pipe(startWith(false));

  protected readonly isScrolled = toSignal(this.scroll$, { initialValue: false });
  protected readonly activeLink = signal('home');
  protected readonly navLinks = NAV_LINKS;
}
