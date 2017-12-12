import { FormGroupName } from '@angular/forms/src/directives';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../common/validators/username.validators';
@Injectable()
export class FormService {
  form;
  constructor() { }

  initialForm() {
    return this.form = new FormGroup({
      account: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          UsernameValidators.cannotContainSpace,
        ],
          // third parameter is async validation function
          UsernameValidators.shouldBeUnique
        ), // first parameter is initial value
        password: new FormControl('', Validators.required)
      })
    });
  }
  get username() {
    return this.form.get('account.username');
  }
  get password() {
    return this.form.get('account.password');
  }
}
