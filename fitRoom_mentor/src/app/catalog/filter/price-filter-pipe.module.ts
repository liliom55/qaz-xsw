import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PriceFilterPipe } from './price-filter.pipe';

@NgModule({
    declarations: [PriceFilterPipe],
    imports: [CommonModule],
    exports: [PriceFilterPipe]
})

export class priceFilterModulePipe { }


