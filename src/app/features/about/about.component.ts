import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { UserIconComponent } from '@shared/components/icons';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserIconComponent],
  templateUrl: './about.component.html',
})
export class AboutSectionComponent {
  protected readonly expanded = signal(false);
}
