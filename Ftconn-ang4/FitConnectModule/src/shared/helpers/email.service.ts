import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BaseService } from "./../base.service";
import { Client } from "./../client/client.model";


@Injectable()
export class EmailService extends BaseService {

    private email = {
        enabled: true,
        emailContext: "sxsw"
    };


    sendEmail(retailer: string, app: string, client: Client, productVersionIds: string[]): Promise<any> {
        if (this.email.enabled && client.email) {
            return this.http
                .post(`${this.apiUrl}/clients/email.json`, JSON.stringify(
                    {
                        client_id: client.id,
                        template_name: this.email.emailContext,
                        data: {
                            retailerApp: retailer,
                            fromApp: app,
                            products: {
                                product_versions: productVersionIds
                            }
                        }
                    }), { headers: this.headers })
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError);
        }
    }




}