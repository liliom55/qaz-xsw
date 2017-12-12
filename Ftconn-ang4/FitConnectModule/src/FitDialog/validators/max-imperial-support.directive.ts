import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { max } from 'ng2-validation/dist/max';
import { maxImperialSupport } from './max-imperial-support.validator';
import { UnitConversionService } from "./../../shared/unit-conversion.service";

const max_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => maxImperialSupportValidator),
    multi: true
};

@Directive({
    selector: '[maxImperialSupport][formControlName],[maxImperialSupport][formControl],[maxImperialSupport][ngModel]',
    providers: [max_VALIDATOR]
})
export class maxImperialSupportValidator implements Validator, OnInit, OnChanges {

    constructor(private unitConversionService: UnitConversionService) {
    }
    @Input() maxImperialSupport: number;
    @Input() unit: string;

    private validator: ValidatorFn;
    private onChange: () => void;

    ngOnInit() {
        this.validator = maxImperialSupport(this.unit, this.unitConversionService, this.maxImperialSupport);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let key in changes) {
            if (key === 'maxImperialSupport') {
                this.validator = maxImperialSupport(this.unit, this.unitConversionService, changes[key].currentValue);
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