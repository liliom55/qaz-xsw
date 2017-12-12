import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

import { DynamicFormComponent }         from '../shared/dynamic-form/dynamic-form.component';

import { HomeComponent } from './home.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { MeasurementFormComponent } from './measurement-form/measurement-form.component';
import { PasswordRegistrationComponent } from './password-registration/password-registration.component';
import { MeasurementHistoryComponent } from './measurement-history/measurement-history.component'
import { PasswordAuthentificationComponent } from './password-authentification/password-authentification.component'
import { LoaderComponent } from './loader/loader.component';
import { BodyTypeComponent } from './body-type/body-type.component';
import { PreFilterComponent } from './pre-filter/pre-filter.component';
import { ScanInstructionComponent } from './scan-instruction/scan-instruction.component';
import { ScanComponent } from './scan/scan.component';

import { CarouselModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CarouselModule.forRoot(),
    FlexLayoutModule

  ],
  declarations: [
    HomeComponent,
    EmailFormComponent,
    MeasurementFormComponent,
    PasswordRegistrationComponent,
    PasswordAuthentificationComponent,
    MeasurementHistoryComponent,
    LoaderComponent,
    BodyTypeComponent,
    PreFilterComponent,
    ScanInstructionComponent,
    ScanComponent,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
