import { Component } from '@angular/core';
import { BottomNavComponent } from './components/bottom-nav';

@Component({
  selector: 'app-mobile-page',
  standalone: true,
  imports: [BottomNavComponent],
  templateUrl: './mobile.page.component.html',
})
export class MobilePageComponent {}
