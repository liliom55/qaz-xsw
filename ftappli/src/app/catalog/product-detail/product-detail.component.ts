import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { Product, ProductVersion } from '../../shared/products/product.model';
import { Client } from '../../shared/clients/client.model';
import { CartService } from '../cart-list/cart.service';
import { NavbarService } from '../navbar.service';
import { CartListComponent } from '../cart-list/cart-list.component';


declare var $: any; // for jquery
@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    //inputs: ['prdId','prdPicUrl', 'prdName', 'PrdBrand', 'prdQuant', 'prdPrice', 'prdDesc', 'prdSize', 'prdFeatures', 'prdColor','prdSku','prdCut','prdFabric','prdSleeve','prdVersionId']

})
export class ProductDetailComponent implements OnInit, OnChanges {

    @Input() product: Product;
    @Input() client: Client;
    @Input() selectedProducts: Product[];

    @Output() selectedProductsUpdate = new EventEmitter<Product[]>();
    productVersion: ProductVersion;
    productColors: Object;

    productMetasConfig: string[];
    productMetas: Object;
    productSizeDescription: Object;

    constructor(private cartService: CartService, private navbarService: NavbarService) {
        this.productMetasConfig = environment.productMetadatas;
        this.productSizeDescription = environment.productSizeDescription;
    }

    ngOnInit() {
        
        if(!this.product || !this.product.productMetadatas) return;
        this.productColors = JSON.parse(this.product.productMetadatas['_product_colors']);
        this.productVersion = this.product.productVersions[0];
        this.productMetas = {};
        this.productMetasConfig.forEach(key => {
            this.product.productMetadatas.hasOwnProperty(key) ? 
            this.productMetas[key] = this.product.productMetadatas[key] : 
            undefined
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.product) {
            this.productColors = JSON.parse(changes.product.currentValue.productMetadatas['_product_colors']);
        }
    }

    addProduct() {
        if (this.selectedProducts && this.selectedProducts.length > 0) {
            if (!this.selectedProducts.find(x => x.id === this.product.id)) {
                this.pushToArray();
            }
        } else {
            // first add
            this.pushToArray();
        }

    }
    pushToArray() {
        (this.selectedProducts = this.selectedProducts ? this.selectedProducts : []).push(this.product);
        this.selectedProductsUpdate.emit(this.selectedProducts);
        this.cartService.addRelation(this.product, this.client, 'SELECTED');
    }
    closeNavbar() {
        this.navbarService.toggleNavbar();
    }
}