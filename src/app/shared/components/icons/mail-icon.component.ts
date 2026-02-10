import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconSize, IconWeight } from './icon.types';

@Component({
  selector: 'app-icon-mail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    'aria-hidden': 'true',
    '[attr.data-size]': 'size()',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.data-weight]="weight()">
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
      <path d="M3 7l9 6l9 -6" />
    </svg>
  `,
})
export class MailIconComponent {
  readonly size = input<IconSize>('md');
  readonly weight = input<IconWeight>('medium');
}
