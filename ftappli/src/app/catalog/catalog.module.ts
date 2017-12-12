import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MaterialModule } from '@angular/material';
import { CustomMaterialModule } from '../customMaterialModule';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';

import { CatalogComponent } from './catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { FiltersComponent } from './filters/filters.component';
import { MenuGlobalComponent, AssistanceDialog } from './menu-global/menu-global.component';
import { ProductTileComponent } from './product-tile/product-tile.component';

import { ProductSizeDisplayPipe } from '../shared/product-size-display.pipe';
import { HumanizePipe } from '../shared/humanize.pipe';
import { PriceFilterPipe } from '../shared/price-filter/price-filter.pipe';
import { ProductService } from '../shared/products/product.service';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';
import {HttpModule} from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
@NgModule({
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    CustomMaterialModule,
    FlexLayoutModule,
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    HttpModule
  ],
  declarations: [
    CatalogComponent,
    ProductTileComponent,
    MenuGlobalComponent,
    AssistanceDialog,
    ProductDetailComponent,
    CartListComponent,
    FiltersComponent
  ],
  providers: [ProductService],
  exports: [CatalogComponent, CustomMaterialModule],
  entryComponents: [AssistanceDialog],


})
export class CatalogModule { }
