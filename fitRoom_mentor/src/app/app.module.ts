import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CardComponent } from './card/card.component';
import { AddToCartService } from './add-to-cart.service';
import { ClientCaptureService } from './client-capture.service';
import { SendMessageServerService } from './send-message-server.service';
import { CartListComponent } from './cart-list/cart-list.component';
//import { PriceFilterPipe } from './price-filter.pipe';
import { priceFilterModulePipe } from './catalog/filter/price-filter-pipe.module';
import {TranslateModule} from "ng2-translate";
import { MaterializeModule } from 'angular2-materialize';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Home' } },
    { path: 'catalog', component: CatalogComponent, data: { title: 'Catalog' } }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    ProductDetailComponent,
    CardComponent,
    CartListComponent
    ],

  imports: [
    BrowserModule,
    FormsModule,
      HttpModule,
      MaterializeModule,
      priceFilterModulePipe,
      TranslateModule.forRoot(),
      RouterModule.forRoot(appRoutes)
  ],
  providers: [AddToCartService, ClientCaptureService, SendMessageServerService, BrowserDomAdapter],
  bootstrap: [AppComponent]
})
export class AppModule { }


