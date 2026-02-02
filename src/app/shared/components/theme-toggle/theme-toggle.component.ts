import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      type="button"
      class="btn btn-ghost btn-circle swap swap-rotate"
      [class.swap-active]="themeService.isDark()"
      (click)="themeService.toggle()"
      [attr.aria-label]="themeService.isDark() ? 'Activer le mode clair' : 'Activer le mode sombre'"
      aria-live="polite"
    >
      <!-- Sun icon (visible in dark mode) -->
      <svg
        class="swap-on size-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"
        />
      </svg>

      <!-- Moon icon (visible in light mode) -->
      <svg
        class="swap-off size-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12"
        />
      </svg>
    </button>
  `,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
