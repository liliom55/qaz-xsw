import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  form;
  constructor(public formService: FormService) { }

  ngOnInit() {
    this.form = this.formService.initialForm();

  }
  login() {
    // // for instance of check out the validation on backend
    // const isValid = authService.login(this.form.value);
    // if (!isValid) {
    //   this.form.setErrors({ invalidLogin: true });
    // }
    this.form.setErrors({ invalidLogin: true });
  }

}
