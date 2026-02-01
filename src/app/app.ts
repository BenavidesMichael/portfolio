import { Component, inject } from '@angular/core';
import { DesktopNavComponent, TabletNavComponent, MobileNavComponent } from './features';
import { ThemeService, LayoutService } from './core/services';
import { Device } from './config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DesktopNavComponent, TabletNavComponent, MobileNavComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly layout = inject(LayoutService);
  device = Device;
}
