import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any; // for jquery
@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  inputs: ["id_prd", "sku_prd", "name_prd", "price_prd", "color_prd", "large_picture_prd", "small_picture_prd", "brand_prd", "cut_prd", "size_prd", "fabric_prd", "feature_prd", "sleeve_prd", "versionId_prd"]

})
export class ProductDetailComponent implements AfterViewInit {
    private id_prd = "";
    private sku_prd = "";
    private name_prd = "";
    private price_prd = "";
    private color_prd = [];
    private large_picture_prd = "";
    private small_picture_prd = "";
    private brand_prd = "";
    private cut_prd = "";
    private size_prd = "";
    private fabric_prd = ""
    private feature_prd = [];
    private sleeve_prd = "";
    private versionId_prd = "";
  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() { }
}
