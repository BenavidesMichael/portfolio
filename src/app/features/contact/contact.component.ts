import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  form,
  FormField,
  submit,
  required,
  email,
  minLength,
  maxLength,
} from '@angular/forms/signals';
import { TranslocoPipe } from '@jsverse/transloco';
import { MailIconComponent, SendIconComponent } from '@shared/components/icons';

interface ContactFormData {
  name: string;
  email: string;
  missionType: string;
  message: string;
}

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoPipe, FormField, MailIconComponent, SendIconComponent],
  templateUrl: './contact.component.html',
})
export class ContactSectionComponent {
  protected readonly contactModel = signal<ContactFormData>({
    name: '',
    email: '',
    missionType: '',
    message: '',
  });

  protected readonly contactForm = form(this.contactModel, (schemaPath) => {
    required(schemaPath.name, { message: 'contact.validation.name-required' });
    minLength(schemaPath.name, 2, { message: 'contact.validation.name-min' });
    maxLength(schemaPath.name, 100, { message: 'contact.validation.name-max' });

    required(schemaPath.email, { message: 'contact.validation.email-required' });
    email(schemaPath.email, { message: 'contact.validation.email-invalid' });

    required(schemaPath.missionType, { message: 'contact.validation.mission-required' });

    required(schemaPath.message, { message: 'contact.validation.message-required' });
    minLength(schemaPath.message, 10, { message: 'contact.validation.message-min' });
    maxLength(schemaPath.message, 500, { message: 'contact.validation.message-max' });
  });

  protected handleSubmit(event: Event): void {
    event.preventDefault();

    submit(this.contactForm, async () => {
      // TODO: POST to backend — see product.md P1 backlog
    });
  }
}
