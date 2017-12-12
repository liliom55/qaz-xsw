import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CardComponent } from './card/card.component';
import { AddToCartService } from './add-to-cart.service';
import { SendMessageRabbitMqService } from './send-message-rabbit-mq.service';
import { ClientCaptureService } from './client-capture.service';
import { CartListComponent } from './cart-list/cart-list.component';
import { PriceFilterPipe } from './price-filter.pipe';
//import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService } from './translate';
import { TranslateModule } from "ng2-translate";
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    ProductDetailComponent,
    CardComponent,
    CartListComponent,
    PriceFilterPipe
    ],

  imports: [
    BrowserModule,
    FormsModule,
      HttpModule,
      MaterializeModule,
      TranslateModule.forRoot(),
      RouterModule.forRoot([
          { path: '', component: HomeComponent },
          { path: 'catalog', component: CatalogComponent }
          
          //{ path: 'page3', component: Page3Component }
      ])
  ],
  providers: [AddToCartService, ClientCaptureService, SendMessageRabbitMqService],
  bootstrap: [AppComponent]
})
export class AppModule { }


