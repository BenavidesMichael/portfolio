import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconSize, IconWeight } from './icon.types';

@Component({
  selector: 'app-icon-moon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    'aria-hidden': 'true',
    '[attr.data-size]': 'size()',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.data-weight]="weight()">
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    </svg>
  `,
})
export class MoonIconComponent {
  readonly size = input<IconSize>('md');
  readonly weight = input<IconWeight>('medium');
}
