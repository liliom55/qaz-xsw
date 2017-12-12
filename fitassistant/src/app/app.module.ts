import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TruncateModule } from 'ng2-truncate'; // cutting the string and putting ...

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { RoomItemComponent } from './room-item/room-item.component';
import { MesageBoxComponent } from './mesage-box/mesage-box.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsCaptureService } from './products-capture.service';
import {TranslateModule} from 'ng2-translate';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppBarComponent,
    RoomItemComponent,
    MesageBoxComponent,
    RoomDetailComponent,
    ProductItemComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      TruncateModule,
      HttpModule,
      TranslateModule.forRoot(),
      RouterModule.forRoot([
          { path: '', component: HomeComponent },
          { path: 'prddetail', component: ProductDetailComponent }
      ])
  ],
  providers: [ProductsCaptureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
