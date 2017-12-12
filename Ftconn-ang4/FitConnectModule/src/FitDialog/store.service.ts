import { Http } from '@angular/http';
import { BaseService } from './../shared/base.service';
import { Client } from './../shared/client/client.model';
import { ClientService } from './../shared/client/client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmailService } from './../shared/helpers/email.service';

@Injectable()
export class StoreService extends BaseService {
    public static retailer: string = 'Default';
    public static app: string = 'FitConnect';
    public static styles = {
        fitDialog: './FitDialog.default.scss',
        input: './input.default.scss'
    }
    public static htmls = {
        fitDialog: './FitDialog.default.html',
        input: './input.default.html'
    }
    public static dialogSize = {
        height: '80vh',
        width: '80vw'
    }
    public logo: string = '';
    public steps: any = {};

    protected retailer: string;
    public showImageOnStep3 = false;
    public account = [];
    public preferences = [];
    public profile = [];
    public measurements = [];
    public bodyShapes = [];
    public client: Client;

    constructor(protected http: Http, protected clientService: ClientService, protected emailService: EmailService) {
        super(http);
        this.client = new Client();
    }

    submitMeasurements(profileSpecs: any): Promise<any> {
        return new Promise(() => { });
    };

    addClient(email: string): Promise<any> {
        this.client.email = email;
        return this.clientService.checkExist(this.client.email).then(result => {
            let clientExist = result['client'];
            if (clientExist) {
                return clientExist;
            } else {
                return this.clientService.addClient(this.client);
            }
        }).then(client => {
            console.log('salut');
            this.client = client
            return;
        });
    }

}