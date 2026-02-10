import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconSize, IconWeight } from './icon.types';

@Component({
  selector: 'app-icon-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    'aria-hidden': 'true',
    '[attr.data-size]': 'size()',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.data-weight]="weight()">
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  `,
})
export class UserIconComponent {
  readonly size = input<IconSize>('md');
  readonly weight = input<IconWeight>('medium');
}
