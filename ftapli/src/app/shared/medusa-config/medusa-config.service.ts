import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params,ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';


@Injectable()
export class MedusaConfigService {
  config;
  constructor(private http: Http, private activatedRoute: ActivatedRoute) {

  }
  getParam() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
    });
    // let a = this.activatedRoute.snapshot.paramMap.get('config');
    // console.log('>>>>',a);
  }
  getConfiguration(): Promise<any> {
    this.getParam();
    // console.log("In getConfiguration of ConfigurationService");
    return this.http
      .get('assets/files/medusa-config.json')
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
    //this.http.get('assets/files/medusa-config.json').map(res => res.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

