import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, Headers, RequestOptions, RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
  constructor(private http: Http) {
  }

  MEASUREMENT_TABLE = [
    {
      name: environment.SHAPE_KEY_NAMES.HEIGHT,
      value: 68.38,
      min: 61.58,
      max: 75.18
    },
    {
      name: environment.SHAPE_KEY_NAMES.WEIGHT,
      value: 189.06,
      min: 100,
      max: 336.58
    },
    {
      name: environment.SHAPE_KEY_NAMES.NECK,
      value: 16.87,
      min: 13.63,
      max: 20.11
    },
    {
      name: environment.SHAPE_KEY_NAMES.CHEST,
      value: 42.96,
      min: 34.08,
      max: 51.84
    },
    {
      name: environment.SHAPE_KEY_NAMES.WAIST,
      value: 37.70,
      min: 27.90,
      max: 47.50
    },
    {
      name: environment.SHAPE_KEY_NAMES.HIP,
      value: 42.46,
      min: 34.44,
      max: 50.48
    },
    {
      name: environment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
      value: 32.31,
      min: 28.82,
      max: 35.80
    }
  ];


  getMeasurements() {
    return this.MEASUREMENT_TABLE;
  }

}
