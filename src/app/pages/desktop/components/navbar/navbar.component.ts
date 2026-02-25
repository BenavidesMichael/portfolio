import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime, map, startWith } from 'rxjs';
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
  private readonly scroll$ = fromEvent(window, 'scroll', { passive: true }).pipe(
    throttleTime(SCROLL_THROTTLE_MS, undefined, { leading: true, trailing: true }),
    map(() => window.scrollY > SCROLL_THRESHOLD),
    startWith(window.scrollY > SCROLL_THRESHOLD),
  );

  protected readonly isScrolled = toSignal(this.scroll$, { initialValue: false });
  protected readonly activeLink = signal('#home');
  protected readonly navLinks = NAV_LINKS;
}
