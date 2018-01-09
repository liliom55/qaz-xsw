import { Component, OnInit, Input } from '@angular/core';
import { Client, ClientCapture } from '../shared/clients/client.model';
import { Product } from '../shared/products/product.model';
import { CustomRoutingService } from '../shared/custom-routing/custom-routing.service';
import { LogoutService } from '../shared/logout/logout.service';
import { FormValidationService } from "../shared/form-validation/form-validation.service";
import { ClientService } from '../shared/clients/client.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-goodbye',
  templateUrl: './goodbye.component.html',
  styleUrls: ['./goodbye.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.7s'))
    ])
  ]
})
export class GoodbyeComponent implements OnInit {

  @Input() client: Client;
  @Input() clientCapture: ClientCapture;
  @Input() selectedProducts: Product[];

  isSended = false;
  email: string;
  constructor(
    private customRoutingService: CustomRoutingService,
    private logoutService: LogoutService,
    private clientService: ClientService,
    public fv: FormValidationService
  ) { }

  ngOnInit() {
    this.fv.buildFormEmail();
    this.email = this.client.email;
  }
  // promise is only for test purpose
  sendEmail(email):Promise<any> {
    this.isSended = true;
    this.client.email = email;
    let clientExist = null;
    this.clientService.checkExist(this.client.email).then(result => {
      if (result) {
        clientExist = result['client'];
        if (clientExist) {
          this.clientService.editClient(clientExist['id'], clientExist).then(client => {
            this.client = client;
            this.clientService.addClientCapture(this.clientCapture, this.client);
          });
        } else {
          this.clientService.editClient(this.client.id, { email: email, anonymous: 0 });
        }
      }
    });
    return null;
  }
  // updateClient(client_, email) {

  // }
  back(): void {
    this.customRoutingService.switchRoute('app-goodbye', 'app-catalog');
  }

  logout(): void {
    let prdIdsList = this.selectedProducts ? this.selectedProducts.map(product => product.productVersions[0].id) : null;
    this.logoutService.logout(this.client, prdIdsList);
  }

}
