import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar';
import { FooterComponent } from './components/footer';

@Component({
  selector: 'app-desktop-page',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './desktop.page.component.html',
})
export class DesktopPageComponent {}
