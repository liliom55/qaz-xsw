import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyPipeSummaryPipe } from './my-pipe-summary.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MyPipeSummaryPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
