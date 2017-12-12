import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../../shared/products/product.model';
import { Client } from '../../shared/clients/client.model';
import { CustomRoutingService } from '../../shared/custom-routing/custom-routing.service';


declare var $: any; // for jquery
@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css', '../catalog.component.css']
})
export class CartListComponent {
    @Input() selectedProducts: Product[];
    @Input() client: Client;

    @Output() selectedProductsUpdate = new EventEmitter<Product[]>();

    constructor(private cartService: CartService, private customRoutingService: CustomRoutingService) { }

    addProduct(product: Product): void {
        //avoid to add multiple same product to selected list
        if(this.selectedProducts.every(selectedProduct => selectedProduct.id != product.id)) {
            this.selectedProducts.push(product);
        }
    }
    deleteProduct(product: Product) {
        let index = this.selectedProducts.findIndex( selectedProduct => selectedProduct.id == product.id );
        if (index > -1) {
            this.cartService.addRelation(this.selectedProducts[index], this.client, 'ABANDONNED');
            this.selectedProducts.splice(index, 1);
            this.selectedProductsUpdate.emit(this.selectedProducts);
        }
    }
    switchToGoodbye(): void {
        this.customRoutingService.switchRoute('app-home', 'app-goodbye');
    }
}
