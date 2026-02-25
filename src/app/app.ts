import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ThemeService, DeviceService } from './core/services';
import { DesktopPageComponent, MobilePageComponent, TabletPageComponent } from './pages';
import { VALID_LANGS, type Lang } from './core/config';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MobilePageComponent, TabletPageComponent, DesktopPageComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly themeService = inject(ThemeService);
  protected readonly deviceService = inject(DeviceService);
  private readonly transloco = inject(TranslocoService);

  ngOnInit(): void {
    const param = new URLSearchParams(window.location.search).get('lang') ?? 'fr';
    const lang: Lang = VALID_LANGS.includes(param as Lang) ? (param as Lang) : 'fr';
    this.transloco.setActiveLang(lang);
  }
}
