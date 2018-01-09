import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';


import { LoaderComponent } from './loader.component';
import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { CustomRoutingService } from '../../shared/custom-routing/custom-routing.service';
import { Client, ClientMetadata, ClientCapture } from '../../shared/clients/client.model';


import {
  TranslateModule,
  TranslateStaticLoader,
  TranslatePipe,
  TranslateLoader,
  TranslateService
} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let ClientEl: Client;
  let customRoutingService: CustomRoutingService;
  let homeRoutingService: HomeRoutingService;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        ProductService,
        HomeRoutingService,
        CustomRoutingService,
        TranslateService
        // { provide: HomeRoutingService, useValue: HomeRoutingServiceStub },
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
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    component.client = new Client();
    component.clientCapture = new ClientCapture();
    customRoutingService = fixture.debugElement.injector.get(CustomRoutingService);
    homeRoutingService = fixture.debugElement.injector.get(HomeRoutingService);
    fixture.detectChanges();
  });
  it('should component works well', () => {
    expect(component).toBeTruthy();
  });
  //------------------------
  it('should NOT to be undefined numberOfProducts', async() => {
    component.ngOnInit().then(() => {
      expect(component.numberOfProducts).not.toBeUndefined();
    });
  });
  it('should be spinner determinate', async() => {
    component.ngOnInit().then(() => {
      expect(component.spinnerMode).toBe('determinate');
    });
  });
  //------------------------------
  it('should call switchRoute of customRoutingService on switchToCatalog method', () => {
    spyOn(customRoutingService, 'switchRoute');
    component.switchToCatalog();
    expect(customRoutingService.switchRoute).toHaveBeenCalled();
  });
  it('should call back of homeRoutingService on tryAgain method', () => {
    spyOn(homeRoutingService, 'back');
    component.tryAgain();
    expect(homeRoutingService.back).toHaveBeenCalled();
  });
  it('should makes empty the products on Destroy', () => {
    component.ngOnDestroy();
    expect(component.products).toBeNull();
  });
});
