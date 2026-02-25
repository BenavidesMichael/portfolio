import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  GithubIconComponent,
  LinkedinIconComponent,
  MailIconComponent,
  BriefcaseIconComponent,
  MapPinIconComponent,
  DownloadIconComponent,
} from '@shared/components/icons';
import { LanguageSwitcherComponent } from '@shared/components/language-switcher';
import { CvPdfService } from '@core/services';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoPipe,
    GithubIconComponent,
    LinkedinIconComponent,
    MailIconComponent,
    BriefcaseIconComponent,
    MapPinIconComponent,
    DownloadIconComponent,
    LanguageSwitcherComponent,
  ],
  templateUrl: './hero.component.html',
})
export class HeroSectionComponent {
  private readonly cvPdfService = inject(CvPdfService);
  protected readonly isGenerating = this.cvPdfService.isGenerating;

  protected downloadCv(): void {
    this.cvPdfService.generateCv();
  }
}
