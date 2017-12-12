/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductDetailComponent } from './product-detail.component';
import { environment } from '../../../environments/environment';

// import { HumanizePipe } from '../../shared/humanize.pipe';
// import { ProductSizeDisplayPipe } from '../../shared/product-size-display.pipe';
import { PipeModule } from '../../pipeModule.module';
import { Product, ProductVersion,ProductMetadata } from '../../shared/products/product.model';
import { Client } from '../../shared/clients/client.model';
import { CartService } from '../cart-list/cart.service';
import { NavbarService } from '../navbar.service';

import { CustomMaterialModule } from '../../customMaterialModule';

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
describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let translate: TranslateService;
  let client: Client;
  let product: Product;
  let selectedProducts;
  let cartService:CartService;
  let navbarService:NavbarService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [CustomMaterialModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        }),
        PipeModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CartService, NavbarService],
    })
      .compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    cartService = fixture.debugElement.injector.get(CartService);
    navbarService = fixture.debugElement.injector.get(NavbarService);
    client = new Client();
    product = new Product();
    selectedProducts = [];
    fixture.detectChanges();
  });

  it('should works well', async(() => {
    expect(component).toBeTruthy();
  }));
  it('should be productMetasConfig same as environment.productMetadatas', () => {
    expect(component.productMetasConfig).toBe(environment.productMetadatas);
  });
  it('should be productSizeDescription same as environment.productSizeDescription', () => {
    expect(component.productSizeDescription).toBe(environment.productSizeDescription);
  });
  it('should NOT be null productVersion if there is product', () => {
    product.productMetadatas = new ProductMetadata();
    expect(component.productVersion).not.toBeNull();
  });
  it('should NOT be null productColors on (ngOnChanges method)', () => {
    expect(component.productColors).not.toBeNull();
  });
  it('should be the length of selectedProducts greater than 0 (addProduct method)', () => {
    component.selectedProducts = [];
    product = new Product();
    product.id = '1';
    component.product = product;
    client.id = '1';
    component.client = client;
    component.addProduct();
    expect(component.selectedProducts.length).toBe(1);
  });
  it('should NOT add exist product to selectedProducts (addProduct method)', () => {
    product = new Product();
    product.id = '1';
    component.product = product;
    component.selectedProducts = [product];
    client.id = '1';
    component.client = client;
    component.addProduct();
    expect(component.selectedProducts.length).toBe(1);
  });
  it('should addRelation of cartService has been called (pushToArray method)', () => {
    spyOn(cartService,'addRelation');
    component.pushToArray();
    expect(cartService.addRelation).toHaveBeenCalled();
  });
  it('should toggleNavbar of navbarService has been called (closeNavbar method)', () => {
    spyOn(navbarService,'toggleNavbar');
    component.closeNavbar();
    expect(navbarService.toggleNavbar).toHaveBeenCalled();
  });
});
