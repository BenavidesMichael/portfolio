import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  GithubIconComponent,
  LinkedinIconComponent,
  MailIconComponent,
  BriefcaseIconComponent,
  MapPinIconComponent,
  DownloadIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GithubIconComponent,
    LinkedinIconComponent,
    MailIconComponent,
    BriefcaseIconComponent,
    MapPinIconComponent,
    DownloadIconComponent,
  ],
  templateUrl: './hero.component.html',
})
export class HeroSectionComponent {}
