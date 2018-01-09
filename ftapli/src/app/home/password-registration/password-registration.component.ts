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
  @Input() client: Client;
  passwordVisibility: boolean = false;
  isClickedNext:boolean;

  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    public fv: FormValidationService
  ) { }
  
  ngOnInit() {
    document.body.style.cursor = 'auto';
    this.isClickedNext = false;
    this.fv.buildFormPasswordReg();
  }
  

  registerPassword(password: string): void {
    //TODO catch error
    document.body.style.cursor = 'wait';
    this.clientService.editClient(this.client.id, { password: password })
      .then(() => {
        this.isClickedNext = true;
        this.homeRoutingService.next(this.constructor.name);
      });
  }



}
