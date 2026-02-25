import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { VALID_LANGS, type Lang } from '@core/config';

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe],
  template: `
    <nav class="flex gap-2" role="navigation" [attr.aria-label]="'lang.group-label' | transloco">
      @for (lang of availableLangs; track lang) {
        <button
          type="button"
          class="btn btn-xs"
          [class.btn-primary]="currentLang() === lang"
          [class.btn-outline]="currentLang() !== lang"
          [attr.aria-current]="currentLang() === lang ? 'true' : null"
          [attr.aria-label]="'lang.' + lang + '-label' | transloco"
          (click)="setLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      }
    </nav>
  `,
})
export class LanguageSwitcherComponent {
  private readonly transloco = inject(TranslocoService);

  protected readonly availableLangs = VALID_LANGS;
  protected readonly currentLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang() as Lang,
  });

  protected setLang(lang: Lang): void {
    this.transloco.setActiveLang(lang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }
}
