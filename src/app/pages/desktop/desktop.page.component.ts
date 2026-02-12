import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './components/navbar';
import { FooterComponent } from './components/footer';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  StackSectionComponent,
  ContactSectionComponent,
} from '../../features';
import { LoadingPlaceholderComponent } from '@shared/components';

@Component({
  selector: 'app-desktop-page',
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    StackSectionComponent,
    ContactSectionComponent,
    LoadingPlaceholderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './desktop.page.component.html',
})
export class DesktopPageComponent {}
