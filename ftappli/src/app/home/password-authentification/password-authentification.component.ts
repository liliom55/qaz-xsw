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
  isClickedNext: boolean;
  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    public fv: FormValidationService
  ) { }
  ngOnInit() {
    document.body.style.cursor = 'auto';
    this.isClickedNext = false;
    this.fv.buildFormPassword(this.client);
  }
  password(password: string): void {
    if (!this.fv.passwordForm.valid) { return; }
    document.body.style.cursor = 'wait';
    this.clientService.password(this.client.id, password)
      .then(response => {
        this.isClickedNext = true;
        if (response) {
          this.homeRoutingService.next(this.constructor.name);
        } else {
          return;
        }
        // TODO handle bad password
      });
  }


}

