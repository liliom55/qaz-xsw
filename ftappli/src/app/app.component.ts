import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Product } from './shared/products/product.model';
import { ProductService } from './shared/products/product.service';
import { Client, ClientCapture } from './shared/clients/client.model';
import { ClientService } from './shared/clients/client.service';
import { CustomRouting } from './shared/custom-routing/custom-routing';
import { CustomRoutingService } from './shared/custom-routing/custom-routing.service';
import { EmailService } from './shared/email/email.service';


import { fakeProducts } from './shared/products/fakeproducts';
import { MapUtils } from './shared/json-mapper/map-utils';

import { Title } from '@angular/platform-browser';
import { environment } from '././../environments/environment'
import { TranslateService } from 'ng2-translate';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-home *ngIf="customRouting.current == 'app-home'" [client]="client" [clientCapture]="clientCapture" [selectedLang]="selectedLang" (switchLanguage) = selectLang($event) ></app-home>
    <app-catalog *ngIf="customRouting.current == 'app-catalog'" [(selectedProducts)]="selectedProducts" [products]="products" [client]="client" [clientCapture]="clientCapture" [selectedLang]="selectedLang" (switchLanguage) = selectLang($event)></app-catalog>
    <app-goodbye *ngIf="customRouting.current == 'app-goodbye'" [client]="client" [selectedProducts]="selectedProducts" [clientCapture]="clientCapture"></app-goodbye>`,

  providers: [EmailService, CustomRoutingService, ClientService, ProductService],
})
export class AppComponent implements OnInit {

  products: Product[];
  selectedProducts: Product[] = [];
  client: Client = new Client;
  clientCapture: ClientCapture = new ClientCapture(); //ClientCapture object for this session
  //Custom Routing to change between views and pass data from one chil component to another since the app has a simple flow (one direction)
  customRouting: CustomRouting = {
    current: 'app-home',
    previous: null
  };
  //translation
  selectedLang = "en";
  supportedLangs = [];

  constructor(
    private titleService: Title,
    private productService: ProductService,
    private clientService: ClientService,
    private customRoutingService: CustomRoutingService,
    private translate: TranslateService,
    private router: Router,

  ) {
    //Receive new Products from product service
    this.router.navigate(['home'], { queryParams: { config: 'http://fitroom.stefanka.tech/DMPNQLRRFK11.json' } });
    //get the medusa configuaration if the app is fitroom

    productService.productEmmitter$.subscribe(products => {
      this.products = products;
      //Extract all metadatas into one object
      this.products.map(product => product.extractMeta())
    });

    //Receive any change on Client or ClientCapture
    clientService.clientEmmitter$.subscribe(client => this.client = client);
    clientService.clientCaptureEmitter$.subscribe(clientCapture => this.clientCapture = clientCapture);

    customRoutingService.routingEmmitter$.subscribe(routing => this.customRouting = routing);

  }

  switchView(comp: string) {
    (this.customRouting['previous'] ? this.customRouting['previous'] : []).push(this.customRouting['current']);
    this.customRouting['current'] = comp;
  }

  ngOnInit() {
    //this.f4akeData();
    this.titleService.setTitle((environment.app + '-' + environment.retailer).toUpperCase());
    //Language setting
    this.supportedLangs = [
      { display: 'En', value: 'en' },
      { display: 'Fr', value: 'fr' }
    ];
    this.translate.addLangs(["en", "fr"]);
    this.translate.setDefaultLang('en');
    this.translate.use(this.selectedLang);
  }
  //language functions
  isCurrentLang(lang: string) {
    return lang === this.selectedLang;
  }

  selectLang(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
  }

  // fakeData() {
  //   //Fake products & client for development
  //   let products: Product[] = [];
  //   fakeProducts['products'].forEach(product => products.push(MapUtils.deserialize(Product, product)));
  //   products.forEach(product => product.extractMeta());
  //   this.products = products;
  //   this.clientService.checkExist('witoldwrob@gmail.com');
  // }

}