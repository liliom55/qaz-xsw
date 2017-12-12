/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { TranslateModule } from "ng2-translate";
import { priceFilterModulePipe } from './filter/price-filter-pipe.module';
import { CardComponent } from '../card/card.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CartListComponent } from '../cart-list/cart-list.component';
import { AddToCartService } from '../add-to-cart.service';
import { ClientCaptureService } from '../client-capture.service';

import { RouterTestingModule } from '@angular/router/testing';

describe('CatalogComponent', () => {
    let component: CatalogComponent;
    let fixture: ComponentFixture<CatalogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CatalogComponent, CardComponent, ProductDetailComponent, CartListComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
