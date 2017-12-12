import { Component } from '@angular/core';
import { Product } from './shared/product-model';
import { Measurement, FormMeasure } from './shared/measure-model'

import { AppServiceService } from './shared/app-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];
  measurement: Measurement;
  formObject: FormMeasure;
  constructor(_service: AppServiceService) {
    this.products = _service.getProducts();
    console.log(this.products);
    this.measurement = _service.getMeasurementUnit();
  }

  fitMe(formVal: FormMeasure) {
    this.formObject = formVal;
  }
}
