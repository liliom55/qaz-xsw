
import { Component, OnInit, Input } from '@angular/core';
import { UnitConversionService } from './../../shared/unit-conversion.service';
import { FormGroup } from "@angular/forms";
import { fitEnvironment } from "./../../environments/fitEnvironment";
import { conformToMask } from "angular2-text-mask/dist/angular2TextMask";
//This is the only way to use resource files dependency injection (expect for using template):
//encapsulating the fitEnvironment in another variable prevents it from being undefined unside @component
//using "" + the variable prevents Error: Cannot find module "." at webpackMissingModule 
var tmp = fitEnvironment;
@Component({
    selector: 'fit-input',
    templateUrl: "" + tmp.store.htmls.input
})
export class FitInputComponent implements OnInit {
    @Input()
    input: any;
    @Input()
    formGroup: FormGroup;
    error: string;
    inputAsIs: string;

    constructor(private unitConversionService: UnitConversionService) {
        this.inputAsIs = "";
        unitConversionService.unitChanged.subscribe((isMetric) => {
            if (isMetric)
                this.inputAsIs = this.unitConversionService.getInImperial(this.inputAsIs, this.input.imperialUnit);
            else
                this.inputAsIs = this.unitConversionService.getInMetric(this.inputAsIs, this.input.imperialUnit);
        });
    }

    ngOnInit() { }


    isFeetOrInchMeasurement(unit) {
        return unit == UnitConversionService.IMPUNITS.feet || unit == UnitConversionService.IMPUNITS.inch;
    }


    private conformToProperMask(value, unit) {
        let conformedValue = value;
        if (!this.unitConversionService.metricUnit && unit == UnitConversionService.IMPUNITS.feet)
            conformedValue = conformToMask(
                value,
                this.unitConversionService.feetMask,
                {
                    guide: false,
                    placeholderChar: '\u2000',
                    keepCharPositions: true,
                }
            ).conformedValue;

        return conformedValue;
    }

    getMask(unit) {
        let mask = { mask: false };
        if (!this.unitConversionService.metricUnit && unit == UnitConversionService.IMPUNITS.feet)
            return {
                mask: this.unitConversionService.feetMask,
                placeholderChar: '\u2000',
                keepCharPositions: true,
            }
        return mask;
    }

    getInProperUnit(value, unit) {
        if (this.unitConversionService.metricUnit)
            return value;
        else return this.unitConversionService.getInImperial(value, unit);
    }

    setInProperUnit(value, unit) {
        //using conformToMask in the setter prevents a bug on safari where
        //the carret always goes at the end of the line
        this.inputAsIs = this.conformToProperMask(value, unit);
        if (this.unitConversionService.metricUnit)
            return value;
        else return this.unitConversionService.getInMetric(value, unit);
    }

    getInputPlacerholder(form, input) {
        let error = this.getError(form, input);
        if (error)
            return error;
        return input.name;
    }

    getError(form, input) {
        let formControl = form.controls[input.name];
        if (formControl && !formControl.valid) {
            if (formControl.errors.min) this.error = 'Minimum de ' + this.getInProperUnit(input.min, input.imperialUnit);
            if (formControl.errors.max) this.error = 'Maximum de ' + this.getInProperUnit(input.max, input.imperialUnit);
        }
        else this.error = null;
        return this.error;
    }
}