import { Component, inject } from '@angular/core';
import { ThemeService } from '@core/services';
import { SunIconComponent, MoonIconComponent } from '../icons';

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
      <app-icon-sun />

      <!-- Moon icon (visible in light mode) -->
      <app-icon-moon />
    </button>
  `,
  imports: [SunIconComponent, MoonIconComponent],
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
