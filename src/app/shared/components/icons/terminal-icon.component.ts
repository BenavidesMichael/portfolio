import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconSize, IconWeight } from './icon.types';

@Component({
  selector: 'app-icon-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    'aria-hidden': 'true',
    '[attr.data-size]': 'size()',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.data-weight]="weight()">
      <path d="M5 7l5 5l-5 5" />
      <path d="M12 19l7 0" />
    </svg>
  `,
})
export class TerminalIconComponent {
  readonly size = input<IconSize>('md');
  readonly weight = input<IconWeight>('medium');
}
