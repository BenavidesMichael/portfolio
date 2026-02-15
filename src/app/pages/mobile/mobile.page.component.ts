import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './components/bottom-nav';
import { HeaderComponent } from './components/header';

@Component({
  selector: 'app-mobile-page',
  imports: [RouterOutlet, BottomNavComponent, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile.page.component.html',
})
export class MobilePageComponent {}
