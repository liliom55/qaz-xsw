import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MaterialModule } from '@angular/material';
import { CustomMaterialModule } from '../customMaterialModule';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';

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
import { ProductService } from '../shared/products/product.service';
import { ClientService } from './../shared/clients/client.service';
import { HomeRoutingService } from './home-routing/home-routing.service';
import { FormValidationService } from "./../shared/form-validation/form-validation.service";
import { MeasurementFormService } from './measurement-form/measurement-form.service';
import {MedusaConfigService} from './../shared/medusa-config/medusa-config.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'ngx-bootstrap';

import { TranslateModule, TranslateStaticLoader, TranslatePipe, TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SharedModule,
    CarouselModule.forRoot(),
    FlexLayoutModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
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
  exports: [HomeComponent, CustomMaterialModule],
  providers: [
    ProductService,
    FormValidationService,
    ClientService,
    HomeRoutingService,
    MeasurementFormService,
    MedusaConfigService
  ],


})
export class HomeModule { }
