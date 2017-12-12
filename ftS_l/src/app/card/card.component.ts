import { Component, OnInit } from '@angular/core';
//import { ProductModel } from '../productModel';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  inputs: ['prdPicUrl', 'prdName', 'PrdBrand', 'prdPrice']
})
export class CardComponent implements OnInit {
    private prdPicUrl = "";
    private prdName = "";
    private PrdBrand = "";
    private prdPrice = "";
  constructor() { }

  ngOnInit() {
  }

}
