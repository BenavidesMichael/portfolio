import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icon-terminal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'icon', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 7l5 5l-5 5" />
      <path d="M12 19l7 0" />
    </svg>
  `,
})
export class TerminalIconComponent {}
