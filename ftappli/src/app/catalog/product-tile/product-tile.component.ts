import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../shared/products/product.model';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {

  @Input() product: Product;
  public _product_name;

  constructor() { }

  ngOnInit() {
  }

}
