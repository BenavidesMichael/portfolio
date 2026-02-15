import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { findExperienceById } from '@data';
import {
  ArrowLeftIconComponent,
  BriefcaseIconComponent,
  ClockIconComponent,
  MapPinIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-experience-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ArrowLeftIconComponent,
    BriefcaseIconComponent,
    ClockIconComponent,
    MapPinIconComponent,
  ],
  templateUrl: './experience-detail.component.html',
})
export class ExperienceDetailComponent {
  private readonly route = inject(ActivatedRoute);

  /** Reactive route param extracted as signal */
  private readonly experienceId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

  /** Experience data resolved from the route param */
  protected readonly experience = computed(() => findExperienceById(this.experienceId()));
}
