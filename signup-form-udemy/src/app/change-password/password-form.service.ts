import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../common/validators/password.validators';
@Injectable()
export class PasswordFormService {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }
  buildForm() {
    return this.form = this.fb.group({
      oldPassword: ['',
        Validators.required,
        PasswordValidators.validOldPassword
      ],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordValidators.passwordsShouldMatch
      });
  }
}
