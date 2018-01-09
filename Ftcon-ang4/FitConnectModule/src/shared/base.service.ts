import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { fitEnvironment } from "./../environments/fitEnvironment";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";


@Injectable()
export class BaseService {

    protected apiUrl: string = fitEnvironment.API_CONFIG.API_URL;  // URL to web api
    protected Authorization: string = fitEnvironment.API_CONFIG.API_AUTH;
    protected headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.Authorization });

    constructor(protected http: Http) { }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    handleErrorObservable(error: any): ErrorObservable {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }



}