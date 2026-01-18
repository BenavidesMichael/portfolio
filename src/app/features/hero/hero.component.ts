import { Component } from '@angular/core';
import { HeroData } from '../../core/models';
import { DownloadIcon, EmailIcon, GithubIcon, LinkedinIcon } from '../../shared/components/icons';
import heroData from '../../core/data/hero.json';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DownloadIcon, EmailIcon, GithubIcon, LinkedinIcon],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly data = heroData as HeroData;

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/cv/cv-fr.pdf';
    link.download = 'CV-Michael-Benavides.pdf';
    link.click();
  }
}
