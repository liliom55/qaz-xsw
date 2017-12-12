import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Product } from '../shared/product-model';


@Injectable()
export class ProductSelectionService {
  private productSelectionSource = new Subject<string>();
  productSelection$ = this.productSelectionSource.asObservable();

  constructor() { }

  sendProductSelection(product: Product) {
    this.productSelectionSource.next(JSON.stringify(product));
  }

}
