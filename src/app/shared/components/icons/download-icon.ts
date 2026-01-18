import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'svg[iconDownload]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    fill: 'none',
    stroke: 'currentColor',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
  },
  template: `
    <svg:path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  `,
})
export class DownloadIcon {}
