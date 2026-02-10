import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconSize, IconWeight } from './icon.types';

@Component({
  selector: 'app-icon-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    'aria-hidden': 'true',
    '[attr.data-size]': 'size()',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.data-weight]="weight()">
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  `,
})
export class CodeIconComponent {
  readonly size = input<IconSize>('md');
  readonly weight = input<IconWeight>('medium');
}
