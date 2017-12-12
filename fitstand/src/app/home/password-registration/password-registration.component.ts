import { Component, Input,OnInit } from '@angular/core';

import { Client } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';




@Component({
  selector: 'password-registration',
  templateUrl: './password-registration.component.html',
  styleUrls: ['../home.component.css'],
})

export class PasswordRegistrationComponent implements OnInit  {
  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    private fv: FormValidationService
  ) { }
  ngOnInit() {
    this.fv.buildFormPasswordReg();
  }
  @Input() client: Client;
  passwordVisibility: boolean = false;

  registerPassword(password: string): void {
    //TODO catch error
    this.clientService.editClient(this.client.id, { password: password })
      .then(() => {
        this.homeRoutingService.next(this.constructor.name);
      });
  }



}
