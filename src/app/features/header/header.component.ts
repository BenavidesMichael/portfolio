import { Component } from '@angular/core';
import { HeaderData } from '../../core/models';
import headerData from '../../core/data/header.json';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly data = headerData as HeaderData;
}
