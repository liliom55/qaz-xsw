import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Measurement, FormMeasure } from '../shared/measure-model';

@Injectable()
export class MeasurementFormService {
  private measurementSource = new Subject<string>();
  measurement$ = this.measurementSource.asObservable();

  constructor() { }

  sendMeasurements(measurements: FormMeasure) {
    this.measurementSource.next(JSON.stringify(measurements));
  }

}
