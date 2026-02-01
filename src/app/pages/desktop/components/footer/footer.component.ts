import { Component } from '@angular/core';

/**
 * Desktop footer component
 * Professional footer with links, copyright, and social media
 */
@Component({
  selector: 'app-desktop-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
