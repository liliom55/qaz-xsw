import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

import { Client, ClientCapture, ClientMetadata } from './client.model';

//Use MapUtils to serialize JSON response from the server to a class object
import { MapUtils } from '../helpers/map.utils';
import { BaseService } from "./../base.service";

@Injectable()
export class ClientService extends BaseService {


    editClient(id: string, fields: Object): Promise<Client> {
        return this.http
            .post(`${this.apiUrl}/clients/edit/${id}.json`, JSON.stringify(fields), { headers: this.headers })
            .toPromise()
            .then(res => this.handleClient(res.json()))
            .catch(this.handleError);
    }

    checkExist(email: string): Promise<Object> {
        return this.http
            .post(`${this.apiUrl}/clients/exists.json`, JSON.stringify({ email: email }), { headers: this.headers })
            .toPromise()
            // Response can be either {client: null} or {client: <Client>}
            .then(res =>
                res.json().client ?
                    { client: this.handleClient(res.json()), hasPassword: res.json().client.has_password } :
                    { client: false, hasPassword: false }
            )
            .catch(this.handleError);
    }

    password(id: string, password: string): Promise<boolean> {
        return this.http
            .post(`${this.apiUrl}/clients/password.json`, JSON.stringify({ id: id, password: password }), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    addClient(client: Client): Promise<Client> {
        let salut = JSON.stringify(MapUtils.serialize(Client, client));
        console.log(salut);
        return this.http
            .post(`${this.apiUrl}/clients/add.json`, JSON.stringify(MapUtils.serialize(Client, client)), { headers: this.headers })
            .toPromise()
            .then(res => this.handleClient(res.json()))
            .catch(this.handleError);
    }


    addClientCapture(clientCapture: ClientCapture, client: Client): Promise<ClientCapture> {
        //clientCapture.clientId = client.id;
        //PATCH
        let clientCaptureToSend: Object = MapUtils.serialize(ClientCapture, clientCapture);
        clientCaptureToSend['client_id'] = client.id;
        return this.http
            .post(`${this.apiUrl}/clientCaptures/add.json`, clientCaptureToSend, { headers: this.headers })
            .toPromise()
            .then(res => this.handleClientCapture(res.json()))
            .catch(this.handleError);
    }

    editClientCapture(clientCapture: ClientCapture): Promise<ClientCapture> {
        // console.log(clientCapture);
        return this.http
            .post(`${this.apiUrl}/clientCaptures/edit/${clientCapture.id}.json`, JSON.stringify(MapUtils.serialize(ClientCapture, clientCapture)), { headers: this.headers })
            .toPromise()
            .then(res => this.handleClientCapture(res.json()))
            .catch(this.handleError);
    }

    getClientCapture(client: Client, garmentType: string): Promise<Object> {
        let jsonToSend = {
            "client_id": client.id,
            "garment_type": garmentType
        }
        return this.http
            .post(`${this.apiUrl}/clientCaptures/lastInContext.json`, JSON.stringify(jsonToSend), { headers: this.headers })
            .toPromise()
            .then(captureObject => captureObject.json())
            .catch(this.handleError);
    }


    private handleClient(clientJson: Object): Client {

        //this.handleClientCapture(clientJson['client']['clientCapture']);
        if (clientJson['client']) {
            let client: Client = MapUtils.deserialize(Client, clientJson['client']);
            return client;
        }
    }
    //  private updateClientCapture(clientMetrics:object){
    //     if(clientMetrics){
    //         if(clientMetrics['breast_band_size']){
    //             clientMetrics['breast_band_size']
    //         }

    //     }
    //  } 
    private handleClientCapture(clientCaptureJson: Object): ClientCapture {
        if (clientCaptureJson['clientCapture']) {
            let clientCapture: ClientCapture = MapUtils.deserialize(ClientCapture, clientCaptureJson['clientCapture']);
            return clientCapture;
        }
    }

}