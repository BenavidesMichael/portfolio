import { Component } from '@angular/core';
import { SidebarNavComponent } from './components/sidebar-nav';
import { HeaderComponent } from './components/header';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  StackSectionComponent,
  ContactSectionComponent,
} from '../../features';
import { LoadingPlaceholderComponent } from '@shared/components';

@Component({
  selector: 'app-tablet-page',
  imports: [
    SidebarNavComponent,
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    StackSectionComponent,
    ContactSectionComponent,
    LoadingPlaceholderComponent,
  ],
  templateUrl: './tablet.page.component.html',
})
export class TabletPageComponent {}
