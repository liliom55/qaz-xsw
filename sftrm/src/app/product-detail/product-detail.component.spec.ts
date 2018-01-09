/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { TranslateModule } from "ng2-translate";
import { CartListComponent } from '../cart-list/cart-list.component';
import { AddToCartService } from '../add-to-cart.service';

describe('ProductDetailComponent', () => {
    let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            declarations: [ProductDetailComponent, CartListComponent],
            providers: [AddToCartService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
