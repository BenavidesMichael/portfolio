import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ClockIconComponent,
  BriefcaseIconComponent,
  ChevronRightIconComponent,
} from '@shared/components/icons';
import { EXPERIENCES } from '@data';

@Component({
  selector: 'app-experience-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClockIconComponent, BriefcaseIconComponent, ChevronRightIconComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceSectionComponent {
  protected readonly experiences = EXPERIENCES;
}
