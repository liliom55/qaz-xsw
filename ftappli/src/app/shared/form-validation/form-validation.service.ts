import { Injectable } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Client } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { existPasswordValidator } from '../../shared/form-validation/wrong-password.directive';
import {emailValidator} from '../../shared/form-validation/wrong-email.directive';
@Injectable()
export class FormValidationService {
  emailForm: FormGroup;
  passwordForm: FormGroup;
  passwordRegisterForm: FormGroup;
  formErrorsList;
  constructor(private fb: FormBuilder, private clntSrv: ClientService) { }


  buildFormEmail(): void {
    this.emailForm = this.fb.group({
      'email': ['', [
        Validators.required,
        emailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i)
      ]]
    });
    this.emailForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data, 'email');

      });

    this.onValueChanged(); // (re)set validation messages now
  }

  buildFormPassword(client): void {
    this.passwordForm = this.fb.group({
      'password': ['', Validators.compose([
        Validators.required
      ]), existPasswordValidator(client.id, this.clntSrv)]
    });
    this.passwordForm.valueChanges
      .subscribe(data => this.onValueChanged(data, 'password'));

    this.onValueChanged(); // (re)set validation messages now
  }
  buildFormPasswordReg(): void {
    this.passwordRegisterForm = this.fb.group({
      'password': ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)]]
    });
    this.passwordRegisterForm.valueChanges
      .subscribe(data => this.onValueChanged(data, 'passwordReg'));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any, thisForm?: string) {
    if (!thisForm) { return; }
    let form: FormGroup;
    let formErrors: Object;
    let validationMessages: object;
    switch (thisForm) {
      case 'email':
        form = this.emailForm;
        formErrors = this.formErrors_email;
        validationMessages = this.validationMessages_email;
        break;
      case 'password':
        form = this.passwordForm;
        formErrors = this.formErrors_password;
        validationMessages = this.validationMessages_password;
        break;
      case 'passwordReg':
        form = this.passwordRegisterForm;
        formErrors = this.formErrors_passwordReg;
        validationMessages = this.validationMessages_passwordReg;
        break;
    }



    for (const field in formErrors) {
      // clear previous error message (if any)
      formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
        
        this.formErrorsList = formErrors[field].split('.');
        var index = this.formErrorsList.indexOf(" ", 0);
        if (index > -1) {
          this.formErrorsList.splice(index, 1);
        }
      }
    }
  }
  formErrors_email = {
    'email': ''
  };
  validationMessages_email = {
    'email': {
      'required': 'Email is required.',
      'wrongEmail': 'Invalid email.',
    }
  };
  formErrors_password = {
    'password': ''
  };
  validationMessages_password = {
    'password': {
      'required': 'Password is required.',
      'wrongPassword': 'Invalid password.',
    }
  };
  formErrors_passwordReg = {
    'password': ''
  };

  validationMessages_passwordReg = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 20 characters long.'
    }
  };

}
