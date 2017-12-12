import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app.config';

import { HomeRoutingService } from './home-routing/home-routing.service';
import { CustomRouting } from '../shared/custom-routing/custom-routing';
import { Client, ClientCapture } from '../shared/clients/client.model';
import { ClientService } from '../shared/clients/client.service';
import { Product } from '../shared/products/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%) scale(1)' }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  providers: [HomeRoutingService]
})

export class HomeComponent implements OnInit {
  homeRouting = new CustomRouting([], 'EmailFormComponent');
  //EmailFormComponent //LoaderComponent //BodyTypeComponent
  @Input() client: Client;
  @Input() clientCapture: ClientCapture;

  products: Product[];


  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    private config: AppConfig,
  ) {}

  ngOnInit() { 
    this.homeRoutingService.routeEmmitter$.subscribe(current => {
      this.homeRouting.previous.push(this.homeRouting.current);
      setTimeout(()=> this.homeRouting.current = current, 500);
    });
  }
}