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
    >
      <!-- Sun icon (visible when dark mode is active → swap-on) -->
      <app-icon-sun class="swap-on" />

      <!-- Moon icon (visible when light mode is active → swap-off) -->
      <app-icon-moon class="swap-off" />
    </button>
  `,
  imports: [SunIconComponent, MoonIconComponent],
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
