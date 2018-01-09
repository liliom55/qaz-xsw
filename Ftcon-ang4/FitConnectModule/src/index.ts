import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CustomFormsModule } from 'ng2-validation/dist';
import { FitDialogComponent } from "./FitDialog/FitDialog.component";
import { FitMediatorComponent } from "./FitMediator/FitMediator.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TextMaskModule } from 'angular2-text-mask';
import { HttpModule, Http } from '@angular/http';
import { TsTranslateLoader } from './shared/helpers/ts-translate-loader';
import { TranslateModule, TranslateLoader } from 'ng2-translate';

import 'rxjs/Rx';
import { ClientService } from "./shared/client/client.service";
import { EmailService } from "./shared/helpers/email.service";
import { FitInputComponent } from "./FitDialog/templates/input.template";
import { maxImperialSupportValidator } from "./FitDialog/validators/max-imperial-support.directive";
import { minImperialSupportValidator } from "./FitDialog/validators/min-imperial-support.directive";



//everything meant to be used outside of this module needs to be exported here
export * from './FitMediator/FitMediator.component';
export * from './FitDialog/FitDialog.component';

//using ts file for languages means that the language files will be compiled in the ftconnect library
export function createTranslateLoader(http: Http) {
    return new TsTranslateLoader();
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CustomFormsModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [
    FitDialogComponent,
    FitMediatorComponent,
    FitInputComponent,
    maxImperialSupportValidator,
    minImperialSupportValidator,
  ],
  exports: [
    FitDialogComponent,
    FitMediatorComponent,
    FitInputComponent
  ],
  providers: [],
  entryComponents: [FitDialogComponent]
})
export class FitConnectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FitConnectModule,
      providers: [FitMediatorComponent, FitDialogComponent, FitInputComponent, ClientService, EmailService]
    };
  }
}
