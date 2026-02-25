import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { UserIconComponent, ChevronRightIconComponent } from '@shared/components/icons';
import { PROFILE_STATS } from '@data';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, TranslocoPipe, UserIconComponent, ChevronRightIconComponent],
  templateUrl: './about.component.html',
})
export class AboutSectionComponent {
  protected readonly expanded = signal(false);
  protected readonly stats = PROFILE_STATS;
}
