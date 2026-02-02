import { Component, inject } from '@angular/core';
import { ThemeService, DeviceService } from './core/services';
import { DesktopPageComponent, MobilePageComponent, TabletPageComponent } from './pages';

@Component({
  selector: 'app-root',
  imports: [MobilePageComponent, TabletPageComponent, DesktopPageComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly deviceService = inject(DeviceService);
}
