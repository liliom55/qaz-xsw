import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { MeasurementFormComponent } from './measurement-form/measurement-form.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AppServiceService } from './shared/app-service.service';
import { ProductSelectionService } from './product-detail/product-selection.service';
import { MeasurementFormService } from './measurement-form/measurement-form.service';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    MeasurementFormComponent,
    AvatarComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [AppServiceService, ProductSelectionService, MeasurementFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
