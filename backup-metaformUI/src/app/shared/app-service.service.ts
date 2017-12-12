import { Injectable } from '@angular/core';
import {Product} from './product-model';
import {Measurement} from './measure-model';
declare var require: any;
@Injectable()
export class AppServiceService {

  constructor() { }
  getProducts():Product[]{
    let products = require('./products.json');
    return products.products;
  }
  getMeasurementUnit():Measurement{
    let measuement = require('./measurement.json');
    return measuement.measurement;
  }
}
