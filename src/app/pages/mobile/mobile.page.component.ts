import { Component } from '@angular/core';
import { BottomNavComponent } from './components/bottom-nav';
import { HeaderComponent } from './components/header';

@Component({
  selector: 'app-mobile-page',
  standalone: true,
  imports: [BottomNavComponent, HeaderComponent],
  templateUrl: './mobile.page.component.html',
})
export class MobilePageComponent {}
