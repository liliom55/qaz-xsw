import { Component, OnInit } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { Product } from './shared/products/product.model';
import { ProductService } from './shared/products/product.service';
import { Client, ClientCapture } from './shared/clients/client.model';
import { ClientService } from './shared/clients/client.service';
import { CustomRouting } from './shared/custom-routing/custom-routing';
import { CustomRoutingService } from './shared/custom-routing/custom-routing.service';
import { EmailService } from './shared/email/email.service';


import { fakeProducts } from './shared/products/fakeproducts'; 
import { MapUtils } from './shared/json-mapper/map-utils';



@Component({
  selector: 'app-root',
  template: `<app-home *ngIf="customRouting.current == 'app-home'" [client]="client" [clientCapture]="clientCapture" ></app-home>
             <app-catalog *ngIf="customRouting.current == 'app-catalog'" [(selectedProducts)]="selectedProducts" [products]="products" [client]="client"></app-catalog>
             <app-goodbye *ngIf="customRouting.current == 'app-goodbye'" [client]="client" [selectedProducts]="selectedProducts"></app-goodbye>`,

  providers: [EmailService]
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


  constructor(
    private productService: ProductService, 
    private clientService: ClientService, 
    private customRoutingService: CustomRoutingService,
    ){
    //Receive new Products from product service
    productService.productEmmitter$.subscribe( products =>  { 
        this.products = products;
        //Extract all metadatas into one object
        this.products.map( product =>  product.extractMeta() )
      });

    //Receive any change on Client or ClientCapture
    clientService.clientEmmitter$.subscribe( client => this.client = client );
    clientService.clientCaptureEmitter$.subscribe ( clientCapture => this.clientCapture = clientCapture );

    customRoutingService.routingEmmitter$.subscribe( routing => this.customRouting = routing );

  }

  switchView( comp:string ) {
    (this.customRouting['previous'] ? this.customRouting['previous'] : []).push(this.customRouting['current']);
    this.customRouting['current'] = comp; 
  }  

  ngOnInit() {
    //this.fakeData();
  }

  fakeData() {
        //Fake products & client for development
        let products:Product[] = [];
        fakeProducts['products'].forEach( product => products.push(MapUtils.deserialize(Product, product)) );
        products.forEach( product => product.extractMeta());
        this.products = products;
        this.clientService.checkExist('witoldwrob@gmail.com');
  }

}