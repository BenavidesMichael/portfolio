import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar';

@Component({
  selector: 'app-desktop-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './desktop.page.component.html',
})
export class DesktopPageComponent {}
