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
  imports: [FormField, MailIconComponent, SendIconComponent],
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
    required(schemaPath.name, { message: 'Le nom est requis.' });
    minLength(schemaPath.name, 2, { message: 'Le nom doit contenir au moins 2 caractères.' });
    maxLength(schemaPath.name, 100, { message: 'Le nom ne peut pas dépasser 100 caractères.' });

    required(schemaPath.email, { message: "L'email est requis." });
    email(schemaPath.email, { message: 'Veuillez entrer une adresse email valide.' });

    required(schemaPath.missionType, { message: 'Veuillez sélectionner un type de mission.' });

    required(schemaPath.message, { message: 'Le message est requis.' });
    minLength(schemaPath.message, 10, {
      message: 'Le message doit contenir au moins 10 caractères.',
    });
    maxLength(schemaPath.message, 500, {
      message: 'Le message ne peut pas dépasser 500 caractères.',
    });
  });

  protected handleSubmit(event: Event): void {
    event.preventDefault();

    submit(this.contactForm, async () => {
      console.log(this.contactModel());
    });
  }
}
