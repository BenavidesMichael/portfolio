import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar';
import { FooterComponent } from './components/footer';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  StackSectionComponent,
  ContactSectionComponent,
} from '../../features';

/**
 * Desktop page component
 * Uses @defer for lazy loading of below-the-fold sections
 * Even though imports are declared, @defer creates separate lazy chunks
 */
@Component({
  selector: 'app-desktop-page',
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    StackSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './desktop.page.component.html',
})
export class DesktopPageComponent {}
