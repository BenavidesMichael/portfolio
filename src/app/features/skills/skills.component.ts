import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CodeIconComponent } from '@shared/components/icons';
import { SKILLS, SKILL_FILTER_CATEGORIES } from '@data';
import type { SkillCategory } from '@models';

@Component({
  selector: 'app-skills-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, CodeIconComponent],
  templateUrl: './skills.component.html',
})
export class SkillsSectionComponent {
  protected readonly filters = SKILL_FILTER_CATEGORIES;
  protected readonly activeFilter = signal<SkillCategory | 'all'>('all');

  protected readonly filteredSkills = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all' ? SKILLS : SKILLS.filter((s) => s.category === filter);
  });
}
