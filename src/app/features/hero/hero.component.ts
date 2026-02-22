import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  GithubIconComponent,
  LinkedinIconComponent,
  MailIconComponent,
  BriefcaseIconComponent,
  MapPinIconComponent,
  DownloadIconComponent,
} from '@shared/components/icons';
import { CvPdfService } from '@core/services';

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
export class HeroSectionComponent {
  private readonly cvPdfService = inject(CvPdfService);
  protected readonly isGenerating = this.cvPdfService.isGenerating;

  protected downloadCv(): void {
    this.cvPdfService.generateCv();
  }
}
