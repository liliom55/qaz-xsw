import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FitConnectModule } from '../../../FitConnectModule/src';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FitConnectModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
