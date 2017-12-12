/**
 * Created by Simon on 2017-08-21.
 */

import { Injectable } from '@angular/core';
import {conformToMask} from 'angular2-text-mask';
declare var math: any;

@Injectable()
export class UnitConversionService {

    feetMask = [ /\d/, '\'', ' ', /\d/, /\d/, '"'];
    inchMask = [  /\d/, /\d/, '"'];
    lbsMask = [  /\d/, /\d/, /\d/, ' lbs'];
    metricUnit = true;

    changeUnits() {
        this.metricUnit = !this.metricUnit;
    }

    // Converts the measurements from inches to cm and returns it to the value of the
    // measurement without changing the model
    setValue(value, unit) {
        if(this.metricUnit){
            return value;
        }
        let total;
        if (unit === 'in') {
            total = this.convertInchToCm(value);
            total = math.number(total, 'cm');
        }else if (unit === 'ft') {
            total = this.convertFeetToCm(value);
            total = math.number(total, 'cm');
        }else if (unit === 'lbs') {
            total = this.convertLbsToKg(value);
            total = math.number(total, 'kg');
        }
        return Math.round(total*10)/10;
    }

    convertInchToCm(value) {
        let inch = Number(value.substring(0, 2));
        inch = math.unit(inch, 'in'); // Creates an inch object from the mathjs library
        return math.to(inch, 'cm');
    }

    convertFeetToCm(value) {
        console.log(value);
        // let feet = Number(value.charAt(0));
        // let inch = Number(value.substring(3, 5));
        let feet = Math.floor(value / 100);
        let inch = value % 100

        feet = math.unit(feet, 'ft');
        inch = math.unit(inch, 'in');
        let totalInInch = math.add(math.to(feet, 'in'), inch);
        return math.to(totalInInch, 'cm');
    }

    convertLbsToKg(value) {
        let weight = Number(value.substring(0, 3));
        weight = math.unit(weight, 'lbs');
        return math.to(weight, 'kg');
    }

    // Getter to display in the input field the value following a certain mask
    // getInImperial(value, unit) {
    //     if(this.metricUnit){
    //         return value;
    //     }

    //     let  valueNotFormatted, mask;
    //     if ( unit === 'in') {
    //         valueNotFormatted = this.convertToInch(value).toString();
    //         mask = this.inchMask;
    //     } else if (unit === 'ft') {
    //         valueNotFormatted = this.convertToFeet(value);
    //         mask = this.feetMask;
    //     } else if (unit === 'lbs') {
    //         valueNotFormatted = this.convertToLbs(value).toString();
    //         mask = this.lbsMask;
    //     }

    //     // function from angular-text-mask that will transform the display to follow the style of the mask
    //     let conformedValue = conformToMask(
    //         valueNotFormatted,
    //         mask,
    //         {guide: false}
    //     );
    //     return conformedValue.conformedValue;
    // }

      getInImperial(value, unit) {
        if(this.metricUnit || unit ===""){
            return value;
        }

        let  valueNotFormatted;
        if ( unit === 'in') {
            valueNotFormatted = this.convertToInch(value);
        } else if (unit === 'ft') {
            valueNotFormatted = this.convertToFeet(value);
        } else if (unit === 'lbs') {
            valueNotFormatted = this.convertToLbs(value);
        }

        
        return Math.round(valueNotFormatted*10)/10;
    }

    convertToLbs(value) {
        let weight = math.unit(value, 'kg');
        let weightInImperial = weight.to('lbs');
        return Math.floor(weightInImperial.toNumber());
    }

    // Performs the calculation to get the conversion in the format X' XX"
    convertToFeet(value) {
        const INCHESINAFOOT = 12;
        let num = this.convertToInch(value);
        let feet = Math.floor(num / INCHESINAFOOT).toString();
        let inches = Math.floor(num % INCHESINAFOOT).toString();

        let valueToDisplay = this.formatFeetValue(feet, inches) ;
        return valueToDisplay;
    }

    // Function to format the value in feet to always be 3 digits
    // A 0 is to be added in case of height with 2 digits, e.g. 2'5" is to be displayed as 2' 05"
    formatFeetValue(feet, inches) {
        let valueToDisplay = feet.toString() ;
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
        return heightInInches.toNumber('in');
    }


}