import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject  }    from 'rxjs/Subject';

//Use MapUtils to serialize JSON response from the server to a class object
import { MapUtils } from '../../shared/json-mapper/map-utils';

import { Product } from './product.model';
import { environment } from '../../../environments/environment'



@Injectable()
export class ProductService {

    private apiUrl: string = this.getApiUrl();  // URL to web api
    private Authorization: string = this.getApiAuth();
    private garmentType: string = this.getGarmentType();
    private headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.Authorization});

    // Observable string sources
    private productEmitter = new Subject<Product[]>();
    // Observable string streams
    productEmmitter$ = this.productEmitter.asObservable();
    products:Product[];

    constructor(private http: Http) { }

    private getApiUrl(): string {
        return environment.apiUrl;
    }
    private getApiAuth(): string {
        return environment.authorization;
    }
    private getGarmentType(): string {
        return environment.garmentType;
    }

    match(captureId: string): Promise<Product[]> {
        return this.http
            .post(`${this.apiUrl}/products/match.json`, JSON.stringify({garment_type: this.garmentType, capture_id: captureId}), {headers: this.headers})
            .toPromise()
            .then(res => {
                let products: Product[] = [];
                res.json().products.forEach(
                    (product) => products.push(MapUtils.deserialize(Product, product)
                ));
                this.emitProducts(products);
                return products;
            })
            .catch( res => this.handleError(res.json().products.error) );
    }

    private handleError(error: any): void {
        //console.error('An error occurred', error); // for demo purposes only
        this.productEmitter.next([]); // emit empty product = no match
        //return Promise.reject(error.message || error);

    }

    emitProducts(products: Product[]): void {
        // console.log(products);
        this.products = products;
        this.productEmitter.next(products);
    }

}