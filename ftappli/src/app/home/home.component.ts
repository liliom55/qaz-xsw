import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { HomeRoutingService } from './home-routing/home-routing.service';
import { CustomRouting } from '../shared/custom-routing/custom-routing';
import { Client, ClientCapture } from '../shared/clients/client.model';
import { ClientService } from '../shared/clients/client.service';
import { Product } from '../shared/products/product.model';
import { TranslateService } from 'ng2-translate';
import { MedusaConfigService } from '../shared/medusa-config/medusa-config.service';
import { environment } from '../../environments/environment';

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
  ]

})

export class HomeComponent implements OnInit {
  homeRouting = new CustomRouting([], 'EmailFormComponent');
  //EmailFormComponent //LoaderComponent //BodyTypeComponent
  @Input() client: Client;
  @Input() clientCapture: ClientCapture;
  @Input() selectedLang: string;
  @Output() switchLanguage: EventEmitter<any> = new EventEmitter();
  products: Product[];
  autoNextStep = 0;
  isError: boolean;
  isError_match: boolean;

  //translation
  // selectedLang = "en";
  supportedLangs = [];

  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    private translate: TranslateService,
    private medusaConfigService: MedusaConfigService
  ) { }

  ngOnInit() {
    if (environment.app === 'fitRoom')
      this.medusaConfigService.getConfiguration().then((res) => { 
        if (res)
        this.autoNextStep = res['medusa_configs']['auto_nextStep_time']; 
      });
    //console.log(this.medusaConfig);
    this.homeRoutingService.routeEmmitter$.subscribe(current => {
      this.homeRouting.previous.push(this.homeRouting.current);
      setTimeout(() => this.homeRouting.current = current, 500);
    });
    //Language setting
    this.supportedLangs = [
      { display: 'En', value: 'en' },
      { display: 'Fr', value: 'fr' }
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
}