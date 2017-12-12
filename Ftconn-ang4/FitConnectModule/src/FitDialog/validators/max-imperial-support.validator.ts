import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { UnitConversionService } from "./../../shared/unit-conversion.service";
import { isPresent } from 'ng2-validation/dist/util/lang';

//This function expect max to be in cm
export const maxImperialSupport = (unit: string, unitConversionService: UnitConversionService, max: number): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!isPresent(max)) return null;
    if (isPresent(Validators.required(control))) return null;
    //sometimes the angular cycle is giving a variable in feet and inch and another in cm.
    //we cant use unitconversionservice.metricUnit to test if unit is metric

    let value = control.value;
    if (!unitConversionService.metricUnit) {
      if (unit == UnitConversionService.IMPUNITS.feet)
        value = unitConversionService.convertFeetToCm(control.value);
      else if (unit == UnitConversionService.IMPUNITS.inch)
        value = unitConversionService.convertInchToCm(control.value);
    }

    //sometimg value is nan because of angular cycle. But value was already validated with a defined value the cycle before.
    //so no error if value is undefined
    if (!value)
      return null
    if (value <= max)
      return null;
    else return { actualValue: value, requiredValue: +max, max: true }
  };
};