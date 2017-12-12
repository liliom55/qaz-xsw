import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: string[];
  @Input() products: Product[];
  selProducts : Product[];
  selCat: string;
  constructor() { }

  ngOnInit() {
    this.categories = ["vest", "shirt", "tee shirt", "sweater",
      "pants", "combination", "underwear", "hat", "belt", "gloves"]
    this.selProducts = [];  
  }
  selectCatg(selectedItem:string):void{
    this.selCat = selectedItem;
    this.selProducts = this.products.filter(product => product.category === (selectedItem+"s"));
  }
}
