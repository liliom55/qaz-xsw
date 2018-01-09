import { Injectable } from '@angular/core';
import { EmailService } from '../email/email.service';
import { Client } from '../clients/client.model'

@Injectable()
export class LogoutService {

  constructor( private emailService: EmailService ) { }

  logout(client: Client, productVersionIds?: string[]) {
    if(client.email) {
      this.emailService.sendEmail(client, productVersionIds ? productVersionIds : null)
      setTimeout(()=>window.location.reload(),500);
    }
    else {
      window.location.reload();
    }
  }



}
