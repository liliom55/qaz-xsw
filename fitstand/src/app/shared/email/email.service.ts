import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../../config/app.config';
import { Client } from '../clients/client.model';


@Injectable()
export class EmailService {

  private apiUrl: string = this.config.getConfig('apiUrl');  // URL to web api
  private Authorization: string = this.config.getConfig('authorization');
  private email: string = this.config.getConfig('email');
  private headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.Authorization});

  constructor(private http: Http, private config: AppConfig) { }

  sendEmail(client: Client, productVersionIds: string[] = null): Promise<any> {
    if(this.email['enabled'] && client.email) {
      return this.http
              .post(`${this.apiUrl}/clients/email.json`, JSON.stringify(
                {
                  client_id: client.id,
                  template_name: this.email['emailContext'],
                  data: {
                    retailerApp: this.config.getConfig('retailer'),
                    fromApp: this.config.getConfig('app'),
                    products: {
                      product_versions: productVersionIds
                    }
                  }
                }), {headers: this.headers})
              .toPromise()
              .then(res => res.json())
              .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



}
