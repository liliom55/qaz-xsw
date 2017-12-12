import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
  declarations: [
    CatalogComponent,
    ProductTileComponent,
    MenuGlobalComponent,
    AssistanceDialog,
    ProductDetailComponent,
    CartListComponent,
    FiltersComponent,
  ],
  exports: [CatalogComponent],
  entryComponents: [AssistanceDialog],


})
export class CatalogModule { }
