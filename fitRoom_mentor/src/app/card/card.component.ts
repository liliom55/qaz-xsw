import { Component, OnInit,Input } from '@angular/core';
//import { ProductModel } from '../productModel';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() prdPicUrl;
    @Input() prdName;
    @Input() PrdBrand;
    @Input() prdPrice;
  constructor() { }

  ngOnInit() {
  }

}
