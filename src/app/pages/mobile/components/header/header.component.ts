import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeToggleComponent } from '@shared/components';

@Component({
  selector: 'app-mobile-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
