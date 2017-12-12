import { Injectable } from '@angular/core';
import { EmailService } from '../email/email.service';
import { Client } from '../clients/client.model'

@Injectable()
export class LogoutService {

  constructor( private emailService: EmailService ) { }

  logout(client: Client, productVersionIds?: string[]) {
    if(client.email) {
      this.emailService.sendEmail(client, productVersionIds ? productVersionIds : null)
      .then(res => window.location.reload());
    }
    else {
      window.location.reload();
    }
  }



}
