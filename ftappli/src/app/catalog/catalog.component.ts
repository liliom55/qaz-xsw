import { Component, OnInit, Input,Output,EventEmitter, ViewChild } from '@angular/core';

import { CartService } from './cart-list/cart.service';
///import { ClientCaptureService } from '../client-capture.service';
import { PriceFilterPipe } from '../shared/price-filter/price-filter.pipe'

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Product } from '../shared/products/product.model';
import { Client, ClientCapture } from '../shared/clients/client.model';
// import { MdGridListModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { LogoutService } from '../shared/logout/logout.service';
import { NavbarService } from './navbar.service';
import { TranslateService } from 'ng2-translate';



@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css'],
    providers: [CartService, NavbarService]
})


export class CatalogComponent implements OnInit {

    @Input() products: Product[];
    @Input() client: Client;
    @Input() clientCapture: ClientCapture;
    @Input() selectedProducts: Product[];
    @Input() selectedLang:string;
    @Output() switchLanguage: EventEmitter<any> = new EventEmitter();

    @ViewChild('sidenav') sidenav;
    @ViewChild('catalogList') catalogList;

    productSelected: Product;

    //translation
    supportedLangs = [];

    constructor(
        cartService: CartService,
        private logoutService: LogoutService,
        private navbarService: NavbarService,
        private translate: TranslateService
    ) {
        navbarService.toggle$.subscribe(
            () => this.sidenav.close()
        )
    }
    ngOnInit() {
        //Language setting
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Français', value: 'fr' }
        ];
        this.translate.use(this.selectedLang);
    }
    //language functions
    isCurrentLang(lang: string) {
        return lang === this.selectedLang;
    }
    selectLang(lang: string) {
        this.switchLanguage.emit(lang);
    }


    onSelect(product: Product) {
        this.productSelected = product;
        if(product.id) this.sidenav.open();
    }

    logout() {
        let selection = this.selectedProducts.length != 0 ? true : false
        this.logoutService.logout(this.client, selection ? this.selectedProducts.map(product => product.productVersions[0].id) : null);
    }

    selectedProductsUpdate(products: Product[]) {
        this.selectedProducts = products;
    }

}
