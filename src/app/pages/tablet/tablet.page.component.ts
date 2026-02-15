import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SidebarNavComponent } from './components/sidebar-nav';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  SkillsSectionComponent,
  ContactSectionComponent,
} from '../../features';
import { LoadingPlaceholderComponent } from '@shared/components';

@Component({
  selector: 'app-tablet-page',
  imports: [
    SidebarNavComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
    LoadingPlaceholderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tablet.page.component.html',
})
export class TabletPageComponent {}
