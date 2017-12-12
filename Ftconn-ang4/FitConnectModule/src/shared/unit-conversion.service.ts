/**
 * Created by Simon on 2017-08-21.
 */

import { Injectable, EventEmitter } from '@angular/core';
import { conformToMask } from 'angular2-text-mask';
declare var math: any;

@Injectable()
export class UnitConversionService {

    public static IMPUNITS = { inch: 'in', feet: 'ft', pounds: 'lbs' };
    public static METUNITS = { centimeters: 'cm', kilograms: 'kg' };
    feetMask = [/\d/, '\'', /\d/, /\d/, '"'];
    inchMask = [/\d/, /\d/, /\d/, '"'];
    metricUnit = true;
    public unitChanged: EventEmitter<boolean> = new EventEmitter();
    //do not round the value**************** when using getters and setters, we need some float precision to convert back the variable
    //otherwise the unitconversion will enter different number than the user wanted to input
    changeUnits() {
        
        this.unitChanged.emit(this.metricUnit);
        this.metricUnit = !this.metricUnit;
    }

    // Converts the measurements from inches to cm and returns it to the value of the
    // measurement without changing the model
    getInMetric(value, unit) {
        let total;
        if (unit === 'in') {
            total = this.convertInchToCm(value);
        } else if (unit === 'ft') {
            total = this.convertFeetToCm(value);
        } else if (unit === 'lbs') {
            total = this.convertLbsToKg(value);
        }
        return math.round(total);
    }

    convertInchToCm(value) {
        const inchString = value.substring(0, 3).replace(/(\s)/g, "");
        const inch = math.unit(Number(inchString), 'in'); // Creates an inch object from the mathjs library
        const total = math.to(inch, 'cm');
        return math.number(total, 'cm');
    }

    convertFeetToCm(value) {
        let feet = Number(value.charAt(0));
        let inch = Number(value.substring(2, 4));
        //let feet = Math.floor(value / 100);
        //let inch = value % 100

        feet = math.unit(feet, 'ft');
        inch = math.unit(inch, 'in');
        let totalInInch = math.add(math.to(feet, 'in'), inch);
        const total = math.to(totalInInch, 'cm');
        return math.number(total, 'cm');
    }

    convertLbsToKg(value) {
        let weight = Number(value.substring(0, 3));
        weight = math.unit(weight, 'lbs');
        const total = math.to(weight, 'kg');
        return math.number(total, 'kg');
    }

    //Getter to display in the input field the value following a certain mask
    getInImperial(value, unit) {

        if (unit === 'in') {
            value = this.convertToInch(value).toString();
            let conformedValue = conformToMask(
                value,
                this.inchMask,
                {
                    guide: false,
                    placeholderChar: '\u2000',
                }
            );
            value = conformedValue.conformedValue;
        } else if (unit === 'ft') {
            value = this.convertToFeet(value);
            // function from angular-text-mask that will transform the display to follow the style of the mask
            let conformedValue = conformToMask(
                value,
                this.feetMask,
                {
                    guide: false,
                    placeholderChar: '\u2000',
                }
            );
            value = conformedValue.conformedValue;
        } else if (unit === 'lbs') {
            value = this.convertToLbs(value).toString();
        }

        return value;
    }

    convertToLbs(value) {
        let weight = math.unit(value, 'kg');
        let weightInImperial = weight.to('lbs');
        return math.round(weightInImperial.toNumber());
    }

    // Performs the calculation to get the conversion in the format X' XX"
    convertToFeet(value) {
        const INCHESINAFOOT = 12;
        let num = this.convertToInch(value);
        let feet = Math.floor(num / INCHESINAFOOT).toString();
        let inches = Math.floor(num % INCHESINAFOOT).toString();

        let valueToDisplay = this.formatFeetValue(feet, inches);
        return valueToDisplay;
    }

    // Function to format the value in feet to always be 3 digits
    // A 0 is to be added in case of height with 2 digits, e.g. 2'5" is to be displayed as 2' 05"
    formatFeetValue(feet, inches) {
        let valueToDisplay = feet.toString();
        if (inches.length === 1) {
            valueToDisplay += '0';
        }
        valueToDisplay += inches;
        return valueToDisplay;
    }

    // Converts to inches directly, in cases where the values are not expected to be in feet
    convertToInch(value) {
        let height = math.unit(value, 'cm'); // converts the value from the input to a math obj in cm
        let heightInInches = height.to('in'); // converts from cm to inches
        return math.round(heightInInches.toNumber('in'));
    }


}