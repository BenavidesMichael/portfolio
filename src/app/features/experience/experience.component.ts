import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  ClockIconComponent,
  BriefcaseIconComponent,
  ChevronRightIconComponent,
} from '@shared/components/icons';
import { EXPERIENCES } from '@data';

@Component({
  selector: 'app-experience-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TranslocoPipe,
    ClockIconComponent,
    BriefcaseIconComponent,
    ChevronRightIconComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceSectionComponent {
  protected readonly experiences = EXPERIENCES;
}
