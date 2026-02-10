import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  GithubIconComponent,
  LinkedinIconComponent,
  MailIconComponent,
} from '@shared/components/icons';
import { CURRENT_YEAR } from '@core/config';

/**
 * Desktop footer component
 * Professional footer with links, copyright, and social media
 */
@Component({
  selector: 'app-desktop-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GithubIconComponent, LinkedinIconComponent, MailIconComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly currentYear = CURRENT_YEAR;
}
