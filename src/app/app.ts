import { Component } from '@angular/core';
import { IconsDemoComponent } from './shared/components/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IconsDemoComponent],
  template: `<app-icons-demo />`,
})
export class App {}
