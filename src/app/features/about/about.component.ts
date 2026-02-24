import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { UserIconComponent, ChevronRightIconComponent } from '@shared/components/icons';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, UserIconComponent, ChevronRightIconComponent],
  templateUrl: './about.component.html',
})
export class AboutSectionComponent {
  protected readonly expanded = signal(false);
}
