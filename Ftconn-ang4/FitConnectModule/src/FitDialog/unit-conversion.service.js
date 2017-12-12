"use strict";
/**
 * Created by Simon on 2017-08-21.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var UnitConversionService = (function () {
    function UnitConversionService() {
        this.feetMask = [/\d/, '\'', ' ', /\d/, /\d/, '"'];
        this.inchMask = [/\d/, /\d/, '"'];
        this.lbsMask = [/\d/, /\d/, /\d/, ' lbs'];
        this.metricUnit = true;
    }
    UnitConversionService.prototype.changeUnits = function () {
        this.metricUnit = !this.metricUnit;
    };
    // Converts the measurements from inches to cm and returns it to the value of the
    // measurement without changing the model
    UnitConversionService.prototype.setValue = function (value, unit) {
        if (this.metricUnit) {
            return value;
        }
        var total;
        if (unit === 'in') {
            total = this.convertInchToCm(value);
            total = math.number(total, 'cm');
        }
        else if (unit === 'ft') {
            total = this.convertFeetToCm(value);
            total = math.number(total, 'cm');
        }
        else if (unit === 'lbs') {
            total = this.convertLbsToKg(value);
            total = math.number(total, 'kg');
        }
        return Math.round(total * 10) / 10;
    };
    UnitConversionService.prototype.convertInchToCm = function (value) {
        var inch = Number(value.substring(0, 2));
        inch = math.unit(inch, 'in'); // Creates an inch object from the mathjs library
        return math.to(inch, 'cm');
    };
    UnitConversionService.prototype.convertFeetToCm = function (value) {
        console.log(value);
        // let feet = Number(value.charAt(0));
        // let inch = Number(value.substring(3, 5));
        var feet = Math.floor(value / 100);
        var inch = value % 100;
        feet = math.unit(feet, 'ft');
        inch = math.unit(inch, 'in');
        var totalInInch = math.add(math.to(feet, 'in'), inch);
        return math.to(totalInInch, 'cm');
    };
    UnitConversionService.prototype.convertLbsToKg = function (value) {
        var weight = Number(value.substring(0, 3));
        weight = math.unit(weight, 'lbs');
        return math.to(weight, 'kg');
    };
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
    UnitConversionService.prototype.getInImperial = function (value, unit) {
        if (this.metricUnit || unit === "") {
            return value;
        }
        var valueNotFormatted;
        if (unit === 'in') {
            valueNotFormatted = this.convertToInch(value);
        }
        else if (unit === 'ft') {
            valueNotFormatted = this.convertToFeet(value);
        }
        else if (unit === 'lbs') {
            valueNotFormatted = this.convertToLbs(value);
        }
        return Math.round(valueNotFormatted * 10) / 10;
    };
    UnitConversionService.prototype.convertToLbs = function (value) {
        var weight = math.unit(value, 'kg');
        var weightInImperial = weight.to('lbs');
        return Math.floor(weightInImperial.toNumber());
    };
    // Performs the calculation to get the conversion in the format X' XX"
    UnitConversionService.prototype.convertToFeet = function (value) {
        var INCHESINAFOOT = 12;
        var num = this.convertToInch(value);
        var feet = Math.floor(num / INCHESINAFOOT).toString();
        var inches = Math.floor(num % INCHESINAFOOT).toString();
        var valueToDisplay = this.formatFeetValue(feet, inches);
        return valueToDisplay;
    };
    // Function to format the value in feet to always be 3 digits
    // A 0 is to be added in case of height with 2 digits, e.g. 2'5" is to be displayed as 2' 05"
    UnitConversionService.prototype.formatFeetValue = function (feet, inches) {
        var valueToDisplay = feet.toString();
        if (inches.length === 1) {
            valueToDisplay += '0';
        }
        valueToDisplay += inches;
        return valueToDisplay;
    };
    // Converts to inches directly, in cases where the values are not expected to be in feet
    UnitConversionService.prototype.convertToInch = function (value) {
        var height = math.unit(value, 'cm'); // converts the value from the input to a math obj in cm
        var heightInInches = height.to('in'); // converts from cm to inches
        return heightInInches.toNumber('in');
    };
    UnitConversionService = __decorate([
        core_1.Injectable()
    ], UnitConversionService);
    return UnitConversionService;
}());
exports.UnitConversionService = UnitConversionService;
