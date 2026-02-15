import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DeviceService } from '@core/services';
import {
  HeroSectionComponent,
  AboutSectionComponent,
  ExperienceSectionComponent,
  SkillsSectionComponent,
  ContactSectionComponent,
} from '../../features';
import { LoadingPlaceholderComponent } from '@shared/components';

@Component({
  selector: 'app-home-sections',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
    LoadingPlaceholderComponent,
  ],
  template: `
    <!-- Hero Section - Always visible -->
    <div id="home">
      <app-hero-section />
    </div>

    <!-- Remaining sections: desktop/tablet scrollable page only -->
    @if (!deviceService.isMobile()) {
      <div id="about">
        @defer (on viewport; prefetch on idle) {
          <app-about-section />
        } @placeholder {
          <app-loading-placeholder size="loading-md" />
        }
      </div>

      <div id="experience">
        @defer (on viewport; prefetch on idle) {
          <app-experience-section />
        } @placeholder {
          <app-loading-placeholder size="loading-md" />
        }
      </div>

      <div id="skills">
        @defer (on viewport; prefetch on idle) {
          <app-skills-section />
        } @placeholder {
          <app-loading-placeholder size="loading-md" />
        }
      </div>

      <div id="contact">
        @defer (on viewport; prefetch on idle) {
          <app-contact-section />
        } @placeholder {
          <app-loading-placeholder size="loading-md" />
        }
      </div>
    }
  `,
})
export class HomeSectionsComponent {
  protected readonly deviceService = inject(DeviceService);
}
