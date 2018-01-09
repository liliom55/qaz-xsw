/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CatalogComponent } from './catalog.component';
import { LogoutService } from '../shared/logout/logout.service';
import { EmailService } from '../shared/email/email.service';
import { Product } from '../shared/products/product.model';
import { Client, ClientCapture } from '../shared/clients/client.model';

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
describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let translate:TranslateService;
  let logoutService:LogoutService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        })],
      declarations: [CatalogComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [LogoutService, EmailService,TranslateService]
    })
      .compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    component.client = new Client();
    component.products = [];
    component.selectedProducts = [];
    component.selectedLang = 'en';
    logoutService = fixture.debugElement.injector.get(LogoutService);
    fixture.detectChanges();
  });

  it('should works well', () => {
    expect(component).toBeTruthy();
  });
  it('should NOT be null productSelected when select a product (onSelect method)', () => {
    let product = new Product();
    component.onSelect(product);
    expect(component.productSelected).not.toBeNull();
  });
  it('should have been called logout of logoutService (logout method)', () => {
    spyOn(logoutService,'logout')
    component.logout();
    expect(logoutService.logout).toHaveBeenCalled();
  });
  it('should be updated selectedProducts (selectedProductsUpdate method)', () => {
    let product1 = new Product();
    let product2 = new Product();
    let products = [product1,product2];
    component.selectedProductsUpdate(products);
    expect(component.selectedProducts).toBe(products);
  });
});
