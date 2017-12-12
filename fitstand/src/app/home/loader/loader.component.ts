import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HomeViews } from '../home.structure';
import { CustomRoutingService } from '../../shared/custom-routing/custom-routing.service';
import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';



@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['../home.component.css', './loader.component.css'],
})

export class LoaderComponent implements OnInit {
    private spinnerMode: string = 'indeterminate';
    private subscription: Subscription;
    numberOfProducts: number;
    products;
    constructor(
        private customRoutingService: CustomRoutingService,
        private productService: ProductService,
        private homeRoutingService: HomeRoutingService,
    ) { }
    ngOnInit() {
        this.subscription = this.productService.productEmmitter$.subscribe(
            products => {
                this.products = products;
                this.numberOfProducts = products.length;
                this.spinnerMode = 'determinate';
            },
            error => {
                this.numberOfProducts = 0;
                this.spinnerMode = 'determinate';
            }
        );
        setTimeout(() => this.catchError(), 5000);
    }
    catchError() {
        if (!this.products) {
            if (!this.productService.products) {
                this.numberOfProducts = 0;
                this.spinnerMode = 'determinate';
            } else {
                this.products = this.productService.products;
                this.numberOfProducts = this.products.length;
                this.spinnerMode = 'determinate';
            }
        }
    }

    switchToCatalog(): void {
        this.customRoutingService.switchRoute('app-home', 'app-catalog');
    }
    tryAgain(): void {
        this.homeRoutingService.back('MeasurementFormComponent');
    }

    ngOnDestroy() {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        this.products = null;
        
    }

}