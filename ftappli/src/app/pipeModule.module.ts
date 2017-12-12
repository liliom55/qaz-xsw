import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import {} from "@angular/common";

import { ProductSizeDisplayPipe } from './shared/product-size-display.pipe';
import { HumanizePipe } from './shared/humanize.pipe';
import { PriceFilterPipe } from './shared/price-filter/price-filter.pipe';
@NgModule({
    imports:        [CommonModule],
    declarations:   [ProductSizeDisplayPipe,HumanizePipe,PriceFilterPipe],
    exports:        [ProductSizeDisplayPipe,HumanizePipe,PriceFilterPipe],
})

export class PipeModule {

//   static forRoot() {
//      return {
//          ngModule: PipeModule,
//          providers: [],
//      };
//   }
} 