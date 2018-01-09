import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
declare var require: any
@Injectable()
export class ProductsCaptureService {
    //suggested products
    private suggProducts: any;
    private sugg_Products;
    
    //selected products
    private selProducts: any; 
    private sel_Products;
    


    //creating product object and put it in array
    private prdName = "";
    private prdId = "";
    private prdBrand = "";
    private prdPrice = "";
    private prdSku = "";
    private prdColor = [];
    private prdPicS = "";
    private prdPicL = "";

    private prdFabric = "";
    private prdCut = "";
    private prdSize = "";
    private prdFeature = [];
    private prdSleeve = "";
    private prdVersionId = "";

    constructor(private http: Http, private router: Router) {
        //this.suggestedProduct();
        //this.selectedProduct();
    }
    suggestedProduct() {
        let jsonTxt = require("./suggestedPrd.json");
        this.suggProducts = jsonTxt;
       
        this.sugg_Products = this.suggProducts;
        return this.createProducts(this.sugg_Products);
    };

    selectedProduct() {
        let jsonTxt = require("./selectedPrd.json");
        //console.log(jsonTxt);
        this.selectedProduct = jsonTxt;
        this.sel_Products = this.selectedProduct;
        return this.createProducts(this.sel_Products);

    };

    private createProducts(list) {
       // alert(list.length)
        var x = [];
        for (var i = 0; i < list.length; i++) {
            try {

                this.prdName = list[i].name;
                this.prdId = list[i].id;
                this.prdSku = list[i].sku;
                this.prdBrand = list[i].brand;
                this.prdColor = list[i].color;
                this.prdCut = list[i].cut;
                this.prdFabric = list[i].fabric;
                if (list == this.sel_Products) {
                    this.prdFeature = list[i].feature;
                } else {
                    this.prdFeature = list[i].feature.split(','); 
                }
                this.prdPicL = list[i].large_picture;
                this.prdPicS = list[i].small_picture;
                this.prdPrice = list[i].price;
                this.prdSize = list[i].size;
                this.prdSleeve = list[i].sleeve;
                this.prdVersionId = list[i].versionId;

                //this.prdSleeve = this.getVersionMetadata("sleeve_style", i, 0);
                //if (this.getVersionMetadata("sleeve_style", i, 0) == "LONG") {
                //    this.prdSleeve = "Longues";
                //} else { this.prdSleeve = "R&eacute;guli&egrave;res" }
                x.push({ id: this.prdId, sku: this.prdSku, name: this.prdName, price: this.prdPrice, color: this.prdColor, large_picture: this.prdPicL, small_picture: this.prdPicS, brand: this.prdBrand, cut: this.prdCut, size: this.prdSize, fabric: this.prdFabric, feature: this.prdFeature, sleeve: this.prdSleeve, versionId: this.prdVersionId });
            } catch (err) {

                console.log(err);
            }

        }
        return x;
    }


}
