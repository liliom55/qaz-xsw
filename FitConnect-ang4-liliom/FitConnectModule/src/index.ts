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
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

import 'rxjs/Rx';



//everything meant to be used outside of this module needs to be exported here
export * from './FitMediator/FitMediator.component';
export * from './FitDialog/FitDialog.component';
export * from './Metaforma.service';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
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
  ],
  exports: [
    FitDialogComponent,
    FitMediatorComponent
  ],
  providers: [],
  entryComponents: [FitDialogComponent]
})
export class FitConnectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FitConnectModule,
      providers: [FitMediatorComponent, FitDialogComponent]
    };
  }
}
