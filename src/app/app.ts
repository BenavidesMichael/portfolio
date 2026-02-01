import { Component, inject } from '@angular/core';
import { MobileLayoutComponent, TabletLayoutComponent, DesktopLayoutComponent } from './layouts';
import { ThemeService, DeviceService } from './core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MobileLayoutComponent, TabletLayoutComponent, DesktopLayoutComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly deviceService = inject(DeviceService);
}
