import { Component, AfterViewInit } from '@angular/core';
import { AddToCartService } from '../add-to-cart.service';


declare var $: any; // for jquery
@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements AfterViewInit {

    constructor(private addTocartService: AddToCartService) { }
    deletFromCart(itemId) {
        //$(this).parent().css('display', 'none');
        setTimeout(this.addTocartService.deleteFromCart(itemId),2000);
    }
    ngAfterViewInit() {
        
    }
  
}
