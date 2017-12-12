import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { FormService } from './signup-form/form.service';
import { ArrayFormComponent } from './array-form/array-form.component';
import { ArrayformService } from './array-form/arrayform.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordFormService } from './change-password/password-form.service';
@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    ArrayFormComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormService, ArrayformService, PasswordFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
