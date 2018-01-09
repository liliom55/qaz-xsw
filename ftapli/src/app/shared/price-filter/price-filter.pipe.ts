import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceFilter',
    pure: false
})
export class PriceFilterPipe implements PipeTransform {

    transform(items: any[], args?: any): any {
        return items.filter(item => parseInt(item.price.replace('$', '')) >= args.minPrice && parseInt(item.price.replace('$', '')) <= args.maxPrice);
    //return null;
  }

}
