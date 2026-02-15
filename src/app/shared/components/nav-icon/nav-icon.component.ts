import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import type { NavIconName } from '@models';
import {
  HomeIconComponent,
  UserIconComponent,
  CodeIconComponent,
  MailIconComponent,
  BriefcaseIconComponent,
} from '../icons';

/**
 * Shared navigation icon resolver
 * Centralizes icon name → component mapping used by mobile dock and tablet sidebar
 */
@Component({
  selector: 'app-nav-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HomeIconComponent,
    UserIconComponent,
    CodeIconComponent,
    MailIconComponent,
    BriefcaseIconComponent,
  ],
  template: `
    @switch (name()) {
      @case ('home') {
        <app-icon-home />
      }
      @case ('user') {
        <app-icon-user />
      }
      @case ('code') {
        <app-icon-code />
      }
      @case ('mail') {
        <app-icon-mail />
      }
      @case ('briefcase') {
        <app-icon-briefcase />
      }
    }
  `,
})
export class NavIconComponent {
  readonly name = input.required<NavIconName>();
}
