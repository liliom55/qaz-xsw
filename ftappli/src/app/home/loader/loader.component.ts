import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HomeViews } from '../home.structure';
import { CustomRoutingService } from '../../shared/custom-routing/custom-routing.service';
import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { Client, ClientCapture } from '../../shared/clients/client.model';



@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['../home.component.css', './loader.component.css'],
})

export class LoaderComponent implements OnInit {
    @Input() client: Client;
    @Input() clientCapture: ClientCapture;
    @Input() medusaConfig;
    spinnerMode: string = 'indeterminate';
    subscription: Subscription;
    numberOfProducts: number;
    products;
    constructor(
        private customRoutingService: CustomRoutingService,
        private productService: ProductService,
        private homeRoutingService: HomeRoutingService,
    ) { }
    // promise is only for test purpose
    ngOnInit():Promise<any> {
        document.body.style.cursor = 'auto';
        this.subscription = this.productService.productEmmitter$.subscribe(
            products => {
                this.products = products;
                this.numberOfProducts = products.length;
                document.body.style.cursor = 'auto';
                this.spinnerMode = 'determinate';
            },
            error => {
                document.body.style.cursor = 'auto';
                this.numberOfProducts = 0;
                this.spinnerMode = 'determinate';
            }
        );

        setTimeout(() => this.catchError(), 5000);
        return null;
    }
    catchError() {
        this.spinnerMode = 'determinate';
        document.body.style.cursor = 'auto';
        if (!this.products) {
            if (!this.productService.products) {
                this.numberOfProducts = 0;
            } else {
                this.products = this.productService.products;
                this.numberOfProducts = this.products.length;
            }
        }
    }

    switchToCatalog(): void {
        this.customRoutingService.switchRoute('app-home', 'app-catalog');
    }
    tryAgain(): void {
        this.homeRoutingService.back('BodyTypeComponent');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.products = null;

    }

}