import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../../config/app.config';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

import { Client, ClientCapture, ClientMetadata } from './client.model';

//Use MapUtils to serialize JSON response from the server to a class object
import { MapUtils } from '../../shared/json-mapper/map-utils';


@Injectable()
export class ClientService {


    private apiUrl: string;  // URL to web api
    private authorization: string
    private headers: Headers;


  // Observable string sources
  private clientEmitter = new Subject<Client>();
  // Observable string streams
  clientEmmitter$ = this.clientEmitter.asObservable();


    // ClientCapture 
    private clientCaptureEmitter = new Subject<ClientCapture>();
    clientCaptureEmitter$ = this.clientCaptureEmitter.asObservable();


    constructor(private http: Http, private config: AppConfig) {
        this.apiUrl = this.config.getConfig('apiUrl');
        this.authorization = this.config.getConfig('authorization');
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.authorization });
    }

    //emit any changes on client to the AppController
    emitClient(client: Client): void {
        this.clientEmitter.next(client);
    }


    emitClientCapture(clientCapture: ClientCapture): void {
        this.clientCaptureEmitter.next(clientCapture);
    }

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
                    { client: false, hasPassord: false }
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
        return this.http
            .post(`${this.apiUrl}/clientCaptures/edit/${clientCapture.id}.json`, JSON.stringify(MapUtils.serialize(ClientCapture, clientCapture)), { headers: this.headers })
            .toPromise()
            .then(res => this.handleClientCapture(res.json()))
            .catch(this.handleError);
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private handleClient(clientJson: Object): Client {
    if (clientJson['client']) {
      let client: Client = MapUtils.deserialize(Client, clientJson['client']);
      this.emitClient(client);
      return client;
    }
  }

 private handleClientCapture(clientCaptureJson: Object): ClientCapture {
      if (clientCaptureJson['clientCapture']) {
          let clientCapture: ClientCapture = MapUtils.deserialize(ClientCapture, clientCaptureJson['clientCapture']);
          this.emitClientCapture(clientCapture);
          return clientCapture;
      }
  }

}

