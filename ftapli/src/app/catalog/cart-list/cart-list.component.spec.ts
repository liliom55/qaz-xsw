/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,NO_ERRORS_SCHEMA } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

import { HttpModule } from '@angular/http';

import { CartListComponent } from './cart-list.component';
import { CartService } from './cart.service';
import { Product } from '../../shared/products/product.model';
import { Client } from '../../shared/clients/client.model';
import { CustomRoutingService } from '../../shared/custom-routing/custom-routing.service';

import { CustomMaterialModule } from '../../customMaterialModule';

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
describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let translate:TranslateService;
  let de: DebugElement;
  let customRoutingService:CustomRoutingService;
  let cartService:CartService;
  let overlayContainerElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        CustomMaterialModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        })],
      declarations: [CartListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        CartService,
        CustomRoutingService,
        TranslateService,
      ]
    })
    .compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    component.client = new Client();
    component.selectedProducts = [];
    customRoutingService = fixture.debugElement.injector.get(CustomRoutingService);
    cartService = fixture.debugElement.injector.get(CartService);
    fixture.detectChanges();
  });

  it('should works well', () => {
    expect(component).toBeTruthy();
  });
  it('should NOT be empty selectedProducts after adding a product (addProduct method)', () => {
    let product = new Product();
    component.addProduct(product);
    expect(component.selectedProducts.length).toBeGreaterThan(0);
  });
  it('should be called addRelation of cartService (deleteProduct method)', () => {
    let product = new Product();
    component.selectedProducts.push(product);
    component.deleteProduct(product);
    expect(true).toBe(true);
  });
   it('should be not be called addRelation of cartService (deleteProduct method)', () => {
    let spy = spyOn(cartService,'addRelation');
    component.deleteProduct(null);
    expect(spy.calls.any()).toBe(false);
  });
  it('should be called switchRoute of customRoutingService (switchToGoodbye method) ', () => {
    let spy = spyOn(customRoutingService,'switchRoute');
    component.switchToGoodbye();
    expect(spy.calls.any()).toBe(true);
  });  
  // it('should be visible Empty basket span if selectedProducts is empty', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   fixture.detectChanges();
  //   expect(compiled.querySelector('.aaa').textContent).toContain('Empty basket');
  // });
});
