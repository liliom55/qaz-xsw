import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AppConfig }       from '../../config/app.config';

import { Product } from '../../shared/products/product.model';
import { Client } from '../../shared/clients/client.model';


@Injectable()
export class CartService {
    //TODO implement ProductClientRelation update to server
    private apiUrl: string;  // URL to web api
    private authorization: string 
    private headers: Headers; 

    constructor(private http: Http, private config: AppConfig) {
        this.apiUrl = this.config.getConfig('apiUrl');
        this.authorization = this.config.getConfig('authorization');
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authorization});
     }

    addRelation(product: Product, client: Client, relation: string): void {
        this.http
            .post(`${this.apiUrl}/clientProductRelations/add.json`, JSON.stringify(
            {
                client_id: client.id,
                products: [{id: product.productVersions[0].id}],
                relation_type: relation
            }),
             {headers: this.headers})
            .toPromise()
            .then()
            .catch(this.handleError);
    }

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



}
