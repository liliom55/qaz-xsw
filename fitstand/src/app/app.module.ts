import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_INITIALIZER } from '@angular/core';

import { AppConfig }       from './config/app.config';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { CatalogModule } from './catalog/catalog.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GoodbyeComponent } from './goodbye/goodbye.component';
import { CatalogComponent } from './catalog/catalog.component';
// Validating Service
import { FormValidationService } from "./shared/form-validation/form-validation.service";
import { WrongPasswordDirective } from "./shared/form-validation/wrong-password.directive";
import { WrongEmailDirective } from "./shared/form-validation/wrong-email.directive";

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

//Configuration file reading
export function initConfig(config: AppConfig){
 return () => config.load() 
}

@NgModule({
  declarations: [
    AppComponent,
    GoodbyeComponent,
    WrongPasswordDirective,
    WrongEmailDirective

    ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    HomeModule,
    CatalogModule,
    SharedModule
  ],
  providers: [
    AppConfig,
    { 
      provide: APP_INITIALIZER,
      useFactory: initConfig, // Configuration file reading
      deps: [AppConfig], 
      multi: true 
    },
    FormValidationService,
  ],
  bootstrap: [AppComponent],
  exports: [ MaterialModule, SharedModule, FlexLayoutModule ], 
})
export class AppModule { }
