import { Component } from '@angular/core';
import { BottomNavComponent } from './components/bottom-nav';
import { HeaderComponent } from './components/header';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  StackSectionComponent,
  ContactSectionComponent,
} from '../../features';

@Component({
  selector: 'app-mobile-page',
  imports: [
    BottomNavComponent,
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    StackSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './mobile.page.component.html',
})
export class MobilePageComponent {}
