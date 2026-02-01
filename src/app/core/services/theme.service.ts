import { Injectable, signal, effect, PLATFORM_ID, inject, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme, THEME_KEY } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly themeSignal = signal<Theme>(this.getInitialTheme());

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = computed(() => this.themeSignal() === Theme.Dark);

  constructor() {
    effect(() => {
      const theme = this.themeSignal();
      if (this.isBrowser) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
      }
    });
  }

  toggle(): void {
    this.themeSignal.update((current) => (current === Theme.Dark ? Theme.Light : Theme.Dark));
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return Theme.Dark;
    }

    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored && (stored === Theme.Light || stored === Theme.Dark)) {
      return stored;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? Theme.Dark : Theme.Light;
  }
}
