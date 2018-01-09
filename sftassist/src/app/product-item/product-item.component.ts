import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  inputs: ["imgUrl", "prd_name", "prd_sku", "prd_color", "prd_size","prd_brand"]
})
export class ProductItemComponent implements OnInit {
    private imgUrl = "";
    private prd_name = "";
    private prd_sku = "";
    private prd_color = [];
    private prd_size = "";
    private prd_brand = "";
  constructor() { }

  ngOnInit() {
  }

}
