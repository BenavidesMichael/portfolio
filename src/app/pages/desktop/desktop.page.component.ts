import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar';
import { FooterComponent } from './components/footer';

@Component({
  selector: 'app-desktop-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './desktop.page.component.html',
})
export class DesktopPageComponent {}
