import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../shared/clients/client.model';
import { Product } from '../shared/products/product.model';
import { CustomRoutingService } from '../shared/custom-routing/custom-routing.service';
import { LogoutService } from '../shared/logout/logout.service';

@Component({
  selector: 'app-goodbye',
  templateUrl: './goodbye.component.html',
  styleUrls: ['./goodbye.component.css']
})
export class GoodbyeComponent implements OnInit {

  @Input() client: Client;
  @Input() selectedProducts: Product[];

  constructor( private customRoutingService: CustomRoutingService, private logoutService: LogoutService ) { }

  ngOnInit() {
  }

  back(): void {
    this.customRoutingService.switchRoute('app-goodbye', 'app-catalog');
  }

  logout(): void {
    this.logoutService.logout(this.client, this.selectedProducts ? this.selectedProducts.map(product => product.productVersions[0].id) : null);
  }

}
