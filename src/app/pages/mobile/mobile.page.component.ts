import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from '@shared/components/theme-toggle';
import { BottomNavComponent } from './components/bottom-nav';

@Component({
  selector: 'app-mobile-page',
  imports: [RouterOutlet, BottomNavComponent, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile.page.component.html',
})
export class MobilePageComponent {}
