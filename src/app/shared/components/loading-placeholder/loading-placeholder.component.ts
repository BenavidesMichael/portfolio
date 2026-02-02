import { Component, ChangeDetectionStrategy, input } from '@angular/core';

/**
 * Reusable loading placeholder component for @defer blocks
 * Displays a centered spinner with customizable size and height
 */
@Component({
  selector: 'app-loading-placeholder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClass()">
      <span [class]="spinnerClass()"></span>
    </div>
  `,
})
export class LoadingPlaceholderComponent {
  /** Container height class (default: 'min-h-screen') */
  height = input<string>('min-h-screen');

  /** Spinner size (default: 'loading-lg') */
  size = input<'loading-xs' | 'loading-sm' | 'loading-md' | 'loading-lg'>('loading-lg');

  protected containerClass = () => `${this.height()} flex items-center justify-center`;
  protected spinnerClass = () => `loading loading-spinner ${this.size()} text-primary-brand`;
}
