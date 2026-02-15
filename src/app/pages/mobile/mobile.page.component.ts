import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BottomNavComponent } from './components/bottom-nav';
import { HeaderComponent } from './components/header';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  ExperienceSectionComponent,
  StackSectionComponent,
  ContactSectionComponent,
} from '../../features';
import { LoadingPlaceholderComponent } from '@shared/components';

@Component({
  selector: 'app-mobile-page',
  imports: [
    BottomNavComponent,
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    StackSectionComponent,
    ContactSectionComponent,
    LoadingPlaceholderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile.page.component.html',
})
export class MobilePageComponent {}
