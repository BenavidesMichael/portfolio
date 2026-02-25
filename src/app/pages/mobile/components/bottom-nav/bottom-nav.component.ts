import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NAV_LINKS_WITH_ICONS } from '@data';
import { NavIconComponent } from '@shared/components';

@Component({
  selector: 'app-bottom-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, TranslocoPipe, NavIconComponent],
  templateUrl: './bottom-nav.component.html',
  host: {
    class: 'dock dock-sm',
    role: 'navigation',
    'aria-label': 'Mobile navigation',
  },
})
export class BottomNavComponent {
  protected readonly navItems = NAV_LINKS_WITH_ICONS;
}
