import { FormGroup} from '@angular/forms';
import { Component } from '@angular/core';
import { PasswordFormService } from './password-form.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form: FormGroup;

  constructor(private formService: PasswordFormService) {
    this.form = formService.buildForm();
  }

  get oldPassword() { return this.formService.form.get('oldPassword'); }
  get newPassword() { return this.formService.form.get('newPassword'); }
  get confirmPassword() { return this.formService.form.get('confirmPassword'); }

}
