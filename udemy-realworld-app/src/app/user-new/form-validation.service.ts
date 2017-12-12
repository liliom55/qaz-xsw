import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { validEmail } from './validation-email.directive';
import { validPhone } from './validation-phone.directive';
import { validPostalCode } from './validation-codepostal.directive';
@Injectable()
export class FormValidationService {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  buildForm(): void {
    this.userForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
      ]],
      'email': ['', [
        Validators.required,
        validEmail(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ]],
      'phone': ['', [
        Validators.required,
        validPhone(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i)
      ]],
      address: this.fb.group({
        'street': ['', [
          Validators.required
        ]],
        'suite': ['', [
          Validators.required
        ]],
        'city': ['', [
          Validators.required
        ]],
        'zipcode': ['', [
          Validators.required,
          validPostalCode(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i)
        ]]
      })

    });

    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      let control = form.get(field);
      //console.log(typeof(control.value));
      if (typeof(control.value) === 'object') {
        console.log(control);
        // control = control.get(field);
      }
      if (control && control.dirty && !control.valid) {
        // console.log('>>>> ', control);
        const messages = this.validationMessages[field];
        // console.log(messages);
        // tslint:disable-next-line:forin
        // console.log(control.errors);
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
        console.log(this.formErrors[field]);

      }
    }
  }

  // tslint:disable-next-line:member-ordering
  formErrors = {
    'name': '',
    'email': '',
    'phone': '',
    'address': {
      'street': '',
      'suite': '',
      'city': '',
      'zipcode': ''
    }

  };

  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      // 'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'email': {
      'required': 'Email is required.',
      'invalidEmail': 'Email is not valid'
    },
    'phone': {
      'required': 'Phone is required.',
      'invalidPhone': 'Phone is not valid'
    },
    'address': {
      'street': {
        'required': 'Street is required.'
      },
      'suite': {
        'required': 'Suite is required.'
      },
      'city': {
        'required': 'City is required.'
      },
      'zipcode': {
        'required': 'Zip Code is required.',
        'invalidCodePostal': 'Zip code is not valid'
      }
    }

  };

}
