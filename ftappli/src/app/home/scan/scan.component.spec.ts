import { ComponentFixture, TestBed, async,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';


import { ScanComponent } from './scan.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '@stomp/stompjs';
import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { StompConfigService, StompService } from '@stomp/ng2-stompjs';
import { AppStompConfigService } from '../../shared/stomp-config/app-stomp-config.service';

import { TranslateModule, 
  TranslateStaticLoader, 
  TranslatePipe, 
  TranslateLoader, 
  TranslateService
} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
describe('ScanComponent', () => {
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let translate:TranslateService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanComponent],
      providers: [
        HomeRoutingService,
        StompService,
        ProductService,
        TranslateService,
        {
          provide: StompConfigService,
          useClass: AppStompConfigService
        }
        // { provide: ClientService, useValue: ClientServiceStub },
        // { provide: HomeRoutingService, useValue: HomeRoutingServiceStub },
        // { provide: FormValidationService, useValue: FormValidationServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      })]
    }).compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should component works well', () => {
    expect(component).toBeTruthy();
  });
  it('should NOT be null viewerStatus,allureResults,subscriptions', () => {
    component.ngOnInit();
    expect(component.viewerStatus).not.toBeNull();
    expect(component.allureResults).not.toBeNull();
    expect(component.subscriptions).not.toBeNull();
  });

});
