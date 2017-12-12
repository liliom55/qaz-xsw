import { Component, OnInit, EventEmitter, ViewEncapsulation, Input, Output } from '@angular/core';
import { Measurement, FormMeasure } from '../shared/measure-model';
import { MeasurementFormService } from './measurement-form.service'
declare var require: any; //TODO:temperory
@Component({
  selector: 'app-measurement-form',
  templateUrl: './measurement-form.component.html',
  styleUrls: ['./measurement-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MeasurementFormComponent implements OnInit {
  @Input() measurement: Measurement;
  @Output() fitMe = new EventEmitter<FormMeasure>();
  heighRange: number;
  chestRange: number;
  neckRange: number;
  hipRange: number;
  waistRange: number;
  sleeveRange: number;
  unit: boolean;
  changedMeasurement: Measurement;
  formValue: FormMeasure;
  constructor(private measurementFormService: MeasurementFormService) {
  }

  ngOnInit() {
    this.unit = true;
    this.changedMeasurement = JSON.parse(JSON.stringify(this.measurement)); // keeps metrics value
    this.setValue();
  }


  setValue() {
    this.heighRange = this.changedMeasurement.height.min;
    this.chestRange = this.changedMeasurement.chest.min;
    this.neckRange = this.changedMeasurement.neck.min;
    this.hipRange = this.changedMeasurement.hip.min;
    this.waistRange = this.changedMeasurement.waist.min;
    this.sleeveRange = this.changedMeasurement.sleeveLength.min;
  }
  changeUnit() {
    const unt_height = 0.032808;
    const unt_others = 0.39370;
    if (!this.unit) {
      this.changedMeasurement.height.min = this.changedMeasurement.height.min * unt_height;
      this.changedMeasurement.height.max = this.changedMeasurement.height.max * unt_height;
      this.changedMeasurement.chest.min = this.changedMeasurement.chest.min * unt_others;
      this.changedMeasurement.chest.max = this.changedMeasurement.chest.max * unt_others;
      this.changedMeasurement.neck.min = this.changedMeasurement.neck.min * unt_others;
      this.changedMeasurement.neck.max = this.changedMeasurement.neck.max * unt_others;
      this.changedMeasurement.hip.min = this.changedMeasurement.hip.min * unt_others;
      this.changedMeasurement.hip.max = this.changedMeasurement.hip.max * unt_others;
      this.changedMeasurement.waist.min = this.changedMeasurement.waist.min * unt_others;
      this.changedMeasurement.waist.max = this.changedMeasurement.waist.max * unt_others;
      this.changedMeasurement.sleeveLength.min = this.changedMeasurement.sleeveLength.min * unt_others;
      this.setValue();
    } else {
      this.changedMeasurement = JSON.parse(JSON.stringify(this.measurement));
      this.setValue();
    }
  }

  onFitMe() {
    this.formValue = new FormMeasure(this.heighRange,this.chestRange,this.neckRange,this.hipRange,this.waistRange,this.sleeveRange);
    this.measurementFormService.sendMeasurements(this.formValue);
    this.fitMe.emit(this.formValue);
  }
}
