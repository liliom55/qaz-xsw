import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { AppConfig }  from '../../config/app.config';
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

    constructor( private cartService: CartService, private navbarService: NavbarService, private config: AppConfig ) {
        this.productMetasConfig = this.config.getConfig("productMetadatas");
        this.productSizeDescription = this.config.getConfig("productSizeDescription");
    }

    ngOnInit() {
        this.productColors = JSON.parse(this.product.productMetadatas['_product_colors']);
        this.productVersion = this.product.productVersions[0];
        this.productMetas = {};
        this.productMetasConfig.forEach(key => this.product.productMetadatas.hasOwnProperty(key) ? this.productMetas[key] = this.product.productMetadatas[key] : undefined);
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.product) {
            this.productColors = JSON.parse(changes.product.currentValue.productMetadatas['_product_colors']);
        }
    }

    addProduct() {
        (this.selectedProducts = this.selectedProducts ? this.selectedProducts : []).push(this.product);
        this.selectedProductsUpdate.emit(this.selectedProducts);
        this.cartService.addRelation(this.product, this.client, 'SELECTED')
    }

    closeNavbar() {
        this.navbarService.toggleNavbar();
    }
 }