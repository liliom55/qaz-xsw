import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { CatalogModule } from './catalog/catalog.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GoodbyeComponent } from './goodbye/goodbye.component';
import { CatalogComponent } from './catalog/catalog.component';
// Validating Service
import { FormValidationService } from './shared/form-validation/form-validation.service';
import { WrongPasswordDirective } from './shared/form-validation/wrong-password.directive';
import { WrongEmailDirective } from './shared/form-validation/wrong-email.directive';
import { ProductService } from './shared/products/product.service';
import { ClientService } from './shared/clients/client.service';
import { HomeRoutingService } from './home/home-routing/home-routing.service';


// import { MaterialModule } from '@angular/material';
import { CustomMaterialModule } from './customMaterialModule';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { TranslateModule, TranslatePipe, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  schemas:[NO_ERRORS_SCHEMA],
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
    ReactiveFormsModule,
    HttpModule,
    CustomMaterialModule,
    FlexLayoutModule,
    HomeModule,
    CatalogModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [
    FormValidationService,
    ProductService,
    ClientService,
    HomeRoutingService
  ],
  bootstrap: [AppComponent],
  exports: [
    CustomMaterialModule,
    SharedModule,
    FlexLayoutModule],
})
export class AppModule { }
