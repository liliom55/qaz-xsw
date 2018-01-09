import { Injectable } from '@angular/core';
//import { ProductModel } from './productModel';
declare var sessionStorage: any;

@Injectable()
export class AddToCartService {
    public orderNumber = 0;
    public listCartProduct = [];
    private isExist = false;
    private thisProduct;
    // fill up the listCartProduct array 
    public addToCart(id, sku, name, price, colors, picLUrl, picSUrl, brand, cut, size, fabric, feature, sleeve, versionId) {
        for (var i = 0; i < this.listCartProduct.length; i++) {
            if (this.listCartProduct[i].large_picture == picLUrl) {
                this.isExist = true;
            }
        }
        // avoiding repetation of same product to add to cart
        if (!this.isExist) {
            this.listCartProduct.push({ id: id, sku: sku, name: name, price: price, color: colors, large_picture: picLUrl, small_picture: picSUrl, brand: brand, cut: cut, size: size, fabric: fabric, feature: feature, sleeve: sleeve, versionId: versionId });
            this.orderNumber = this.listCartProduct.length;
            sessionStorage.setItem("listCartProduct", JSON.stringify(this.listCartProduct));
            sessionStorage.setItem("orderNumber", this.orderNumber+"");
            
        }
        this.isExist = false;
    }
    //delete selected product from cart
    public deleteFromCart(id) {
        
        this.thisProduct = this.listCartProduct.find(x => x.id == id);
        var idx = this.listCartProduct.indexOf(this.thisProduct);
        this.listCartProduct.splice(idx, 1); // delete from array selected product
        this.orderNumber = this.listCartProduct.length;
        //save the changes in sessionStorage
        sessionStorage.setItem("listCartProduct", JSON.stringify(this.listCartProduct));
        sessionStorage.setItem("orderNumber", this.orderNumber + "");
    }
  constructor() { }
    
}
