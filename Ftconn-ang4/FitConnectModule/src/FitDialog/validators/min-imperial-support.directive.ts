import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { UnitConversionService } from "./../../shared/unit-conversion.service";
import { min } from 'ng2-validation/dist/min';
import { minImperialSupport } from './min-imperial-support.validator';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => minImperialSupportValidator),
  multi: true
};

@Directive({
  selector: '[minImperialSupport][formControlName],[minImperialSupport][formControl],[minImperialSupport][ngModel]',
  providers: [MIN_VALIDATOR]
})
export class minImperialSupportValidator implements Validator, OnInit, OnChanges {

  @Input() minImperialSupport: number;
  @Input() unit: string;

  private validator: ValidatorFn;
  private onChange: () => void;

  constructor(private unitConversionService: UnitConversionService) {
  }

  ngOnInit() {
      this.validator = minImperialSupport(this.unit, this.unitConversionService, this.minImperialSupport);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let key in changes) {
      if (key === 'minImperialSupport') {
          this.validator = minImperialSupport(this.unit, this.unitConversionService, changes[key].currentValue);
        if (this.onChange) this.onChange();
      }
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}