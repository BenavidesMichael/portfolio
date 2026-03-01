import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  isDevMode,
  Injectable,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { provideTransloco, TranslocoLoader, Translation } from '@jsverse/transloco';
import { forkJoin, map } from 'rxjs';
import type { Observable } from 'rxjs';

import { routes } from './app.routes';

const DOMAINS = ['nav', 'lang', 'hero', 'about', 'skills', 'experience', 'contact', 'cv'] as const;

// Relative URLs resolve correctly against <base href> in both dev and production.
// forkJoin loads all domain files in parallel then merges into a single Translation object.
@Injectable({ providedIn: 'root' })
class I18nLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<Translation> {
    return forkJoin(
      DOMAINS.map((domain) => this.http.get<Translation>(`assets/i18n/${lang}/${domain}.json`)),
    ).pipe(map((translations) => Object.assign({}, ...translations)));
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en', 'es'] as const,
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: I18nLoader,
    }),
  ],
};
