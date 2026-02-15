import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import {
  MailIconComponent,
  LinkedinIconComponent,
  SendIconComponent,
} from '@shared/components/icons';

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MailIconComponent, LinkedinIconComponent, SendIconComponent],
  templateUrl: './contact.component.html',
})
export class ContactSectionComponent {
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly missionType = signal('');
  protected readonly message = signal('');

  protected readonly messageLength = computed(() => this.message().length);

  protected handleSubmit(event: Event): void {
    event.preventDefault();
    // Post-MVP: send to backend
    console.log({
      name: this.name(),
      email: this.email(),
      missionType: this.missionType(),
      message: this.message(),
    });
  }
}
