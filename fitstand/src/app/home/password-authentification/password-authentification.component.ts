import { Component, Input, OnInit } from '@angular/core';

import { Client } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';

import { HomeRoutingService } from '../home-routing/home-routing.service';
import { FormValidationService } from "../../shared/form-validation/form-validation.service";




@Component({
  selector: 'password-authentification',
  templateUrl: './password-authentification.component.html',
  styleUrls: ['../home.component.css'],
})

export class PasswordAuthentificationComponent implements OnInit {
  @Input() client: Client;
  passwordVal: string;
  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    private fv: FormValidationService
  ) { }
  ngOnInit() {
    this.fv.buildFormPassword(this.client);
  }
  password(password: string): void {
    if (!this.fv.passwordForm.valid) { return; }
    this.clientService.password(this.client.id, password)
      .then(response => {
        if (response === true) {
          this.homeRoutingService.next(this.constructor.name);
        } else {
          return;
        }
        // TODO handle bad password
      });
  }


}

