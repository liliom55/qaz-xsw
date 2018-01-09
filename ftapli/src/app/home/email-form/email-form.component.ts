import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { environment } from '../../../environments/environment'

import { Client, ClientMetadata } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';

import { HomeRoutingService } from '../home-routing/home-routing.service';

import { MapUtils } from '../../shared/json-mapper/map-utils';
import { FormValidationService } from "../../shared/form-validation/form-validation.service";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css', '../home.component.css'],

})

export class EmailFormComponent implements OnInit {
  @Input() client: Client;
  @Input() autoNextStep;
  isClickedIncognito: boolean;
  isClickedNext: boolean;

  constructor(
    private clientService: ClientService,
    private homeRoutingService: HomeRoutingService,
    public fv: FormValidationService
  ) { }

  ngOnInit() {
    // this.isClickedIncognito = null;
    this.isClickedNext = false;
    this.fv.buildFormEmail();
    setTimeout(() => {
      if (this.autoNextStep)
        this.next(true);
    }, 0);
  }

  // promise is only for test purpose
  next(anonymous: boolean): Promise<any> {
    document.body.style.cursor = 'wait';
    this.client.anonymous = anonymous === true ? 1 : 0;
    // If client is anonymous go directly to measurement form
    if (anonymous) {
      this.isClickedIncognito = true;
      this.saveClient();
      this.homeRoutingService.next(this.constructor.name, { anonymous: true });
    } else {// Check if client exists in DB ; check if has password ;
      this.isClickedNext = true;
      this.isClickedIncognito = false;
      this.clientService.checkExist(this.client.email)
        .then(exists =>
          this.handleExist(exists)
        );
    }
    return null;
  }
  saveClient(): void {
    let gender = new ClientMetadata('gender', environment.gender);
    (this.client.clientMetadatas = this.client.clientMetadatas ? this.client.clientMetadatas : []).push(gender);
    if (this.client.anonymous === 1)
      this.client.email = null;
    else if (this.client.email === null) { return; }
    this.clientService.addClient(this.client)
      .then(client => this.client = client);
  }

  //If client doesn't exist then save; else route depending if password exists or not
  handleExist(res: Object) {
    if (!res) return;
    if (!res['client']) {
      this.saveClient();
      let app = environment.app;
      this.homeRoutingService.next(this.constructor.name, { anonymous: false, exists: false });
    } else {
      res['hasPassword'] ?
        this.homeRoutingService.next(this.constructor.name, { anonymous: false, exists: true, hasPassword: true }) :
        this.homeRoutingService.next(this.constructor.name, { anonymous: false, exists: true, hasPassword: false });
    }
  }
}
