(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/platform-browser/animations'), require('@angular/material'), require('@angular/flex-layout/index'), require('ng2-validation/dist/index'), require('@angular/http'), require('rxjs/Observable'), require('rxjs/add/operator/map'), require('rxjs/add/operator/catch'), require('@angular/platform-browser'), require('@angular/forms'), require('angular2-text-mask'), require('ng2-translate/index'), require('rxjs/Rx')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/platform-browser/animations', '@angular/material', '@angular/flex-layout/index', 'ng2-validation/dist/index', '@angular/http', 'rxjs/Observable', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', '@angular/platform-browser', '@angular/forms', 'angular2-text-mask', 'ng2-translate/index', 'rxjs/Rx'], factory) :
	(factory((global.fitconnectmodule = {}),global._angular_core,global._angular_common,global._angular_platformBrowser_animations,global._angular_material,global._angular_flexLayout_index,global.ng2Validation_dist_index,global._angular_http,global.rxjs_Observable,null,null,global._angular_platformBrowser,global._angular_forms,global.angular2TextMask,global.ng2Translate_index));
}(this, (function (exports,_angular_core,_angular_common,_angular_platformBrowser_animations,_angular_material,_angular_flexLayout_index,ng2Validation_dist_index,_angular_http,rxjs_Observable,rxjs_add_operator_map,rxjs_add_operator_catch,_angular_platformBrowser,_angular_forms,angular2TextMask,ng2Translate_index) { 'use strict';

var MetaformaService = (function () {
    function MetaformaService() {
        this.measurementsAdded = new _angular_core.EventEmitter();
    }
    /**
     * @param {?} bodySpecs
     * @return {?}
     */
    MetaformaService.prototype.submitMeasurements = function (bodySpecs) {
        this.measurementsAdded.emit(bodySpecs);
    };
    MetaformaService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /**
     * @nocollapse
     */
    MetaformaService.ctorParameters = function () { return []; };
    return MetaformaService;
}());

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    API_URL: 'https://admin.unicorp.stefanka.tech/api',
    API_AUTH: 'Basic bG9naXN0aWs6bG9naXN0aWthZG1pbg==',
    SHAPE_KEY_NAMES: {
        ECTOMORPH: 'ectomorph',
        ENDOMORPH: 'endomorph',
        ENDOMESOMORPH: 'endoMesomorph',
        WEIGHT: 'weight',
        HEIGHT: 'height',
        NECK: 'neck_size',
        CHEST: 'chest_size',
        WAIST: 'waist_width',
        HIP: 'hip_size',
        SLEEVE_LENGTH: 'sleeve_length',
        AGE: 'age'
    }
};

var DataService = (function () {
    /**
     * @param {?} http
     */
    function DataService(http) {
        this.http = http;
        this.IMPUNITS = ['in', 'ft', 'lbs'];
        this.METUNITS = ['cm', 'kg'];
        this.BODYSHAPES_TABLE = [
            {
                imgUrl: './assets/icons/regular.png',
                shapeKeyEctomorph: 0.7,
                shapeKeyEndomorph: 0.7,
                shapeKeyEndomesomorph: 0.5
            },
            {
                imgUrl: './assets/icons/fat.png',
                shapeKeyEctomorph: 0.9,
                shapeKeyEndomorph: 0.7,
                shapeKeyEndomesomorph: 0.35
            },
            {
                imgUrl: './assets/icons/muscular.png',
                shapeKeyEctomorph: 0,
                shapeKeyEndomorph: 0,
                shapeKeyEndomesomorph: 1
            }
        ];
        this.SHAPE_TABLE = [
            {
                name: environment.SHAPE_KEY_NAMES.ECTOMORPH,
                shapeKeyName: environment.SHAPE_KEY_NAMES.ECTOMORPH,
                value: 0.7,
                min: 0,
                max: 1
            },
            {
                name: environment.SHAPE_KEY_NAMES.ENDOMORPH,
                shapeKeyName: environment.SHAPE_KEY_NAMES.ENDOMORPH,
                value: 0.7,
                min: 0,
                max: 1
            },
            {
                name: environment.SHAPE_KEY_NAMES.ENDOMESOMORPH,
                shapeKeyName: environment.SHAPE_KEY_NAMES.ENDOMESOMORPH,
                value: 0.5,
                min: 0,
                max: 1
            }
        ];
        this.BASIC_INFO = [
            {
                name: environment.SHAPE_KEY_NAMES.AGE,
                shapeKeyName: environment.SHAPE_KEY_NAMES.AGE,
                value: 25,
                min: 0,
                max: 120,
                imgUrl: './assets/icons/age.svg',
                svgIcon: 'ageIcon',
                imperialUnit: this.IMPUNITS[0],
                metricUnit: this.METUNITS[0]
            },
            {
                name: environment.SHAPE_KEY_NAMES.HEIGHT,
                shapeKeyName: environment.SHAPE_KEY_NAMES.HEIGHT,
                value: 170,
                min: 145,
                max: 210,
                imgUrl: './assets/icons/height.svg',
                svgIcon: 'heightIcon',
                imperialUnit: this.IMPUNITS[1],
                metricUnit: this.METUNITS[0]
            },
            {
                name: environment.SHAPE_KEY_NAMES.WEIGHT,
                shapeKeyName: environment.SHAPE_KEY_NAMES.WEIGHT,
                value: 170,
                min: 150,
                max: 250,
                imgUrl: './assets/icons/weight.svg',
                svgIcon: 'weightIcon',
                imperialUnit: this.IMPUNITS[2],
                metricUnit: this.METUNITS[1]
            }
        ];
        this.MEASUREMENT_TABLE = [
            {
                name: environment.SHAPE_KEY_NAMES.NECK,
                shapeKeyName: environment.SHAPE_KEY_NAMES.NECK,
                value: 38,
                min: 25,
                max: 51,
                imperialUnit: this.IMPUNITS[0],
                metricUnit: this.METUNITS[0]
            },
            {
                name: environment.SHAPE_KEY_NAMES.CHEST,
                shapeKeyName: environment.SHAPE_KEY_NAMES.CHEST,
                value: 101,
                min: 42,
                max: 160,
                imperialUnit: this.IMPUNITS[0],
                metricUnit: this.METUNITS[0]
            },
            {
                name: environment.SHAPE_KEY_NAMES.WAIST,
                shapeKeyName: environment.SHAPE_KEY_NAMES.WAIST,
                value: 87,
                min: 22,
                max: 152,
                imperialUnit: this.IMPUNITS[0],
                metricUnit: this.METUNITS[0]
            },
            {
                name: environment.SHAPE_KEY_NAMES.HIP,
                shapeKeyName: environment.SHAPE_KEY_NAMES.HIP,
                value: 101,
                min: 34,
                max: 168,
                imperialUnit: this.IMPUNITS[0],
                metricUnit: this.METUNITS[0]
            },
            {
                name: environment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
                shapeKeyName: environment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
                value: 87,
                min: 74,
                max: 100,
                imperialUnit: this.IMPUNITS[0],
                metricUnit: this.METUNITS[0]
            },
        ];
    }
    /**
     * @return {?}
     */
    DataService.prototype.getBodyShapes = function () {
        return this.BODYSHAPES_TABLE;
    };
    /**
     * @return {?}
     */
    DataService.prototype.getMeasurements = function () {
        return this.MEASUREMENT_TABLE;
    };
    /**
     * @return {?}
     */
    DataService.prototype.getBasicInfo = function () {
        return this.BASIC_INFO;
    };
    /**
     * @return {?}
     */
    DataService.prototype.getShapes = function () {
        return this.SHAPE_TABLE;
    };
    /**
     * @param {?} measurements
     * @return {?}
     */
    DataService.prototype.addCapture = function (measurements) {
        var /** @type {?} */ data = {
            client_capture_metrics: []
        };
        measurements.forEach(function (measurement) {
            data.client_capture_metrics.push({
                type: measurement.shapeKeyName,
                value: measurement.value
            });
        });
        var /** @type {?} */ url = environment.API_URL + '/clientCaptures/add.json';
        var /** @type {?} */ headers = new _angular_http.Headers({ 'Authorization': environment.API_AUTH });
        var /** @type {?} */ options = new _angular_http.RequestOptions({ headers: headers });
        return this.http.post(url, data, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleErrorObservable);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    DataService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return rxjs_Observable.Observable.throw(error.message || error);
    };
    DataService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /**
     * @nocollapse
     */
    DataService.ctorParameters = function () { return [
        { type: _angular_http.Http, },
    ]; };
    return DataService;
}());

var FitMediatorComponent = (function () {
    /**
     * @param {?} dialog
     */
    function FitMediatorComponent(dialog) {
        this.dialog = dialog;
    }
    /**
     * @return {?}
     */
    FitMediatorComponent.prototype.showFitDialog = function () {
        var _this = this;
        this.notificationMsg = "";
        this.mediatorSidenav.close();
        this.dialogRef = this.dialog.open(FitDialogComponent, {
            height: '80vh',
            width: '80vw'
        });
        this.dialogRef.afterClosed().subscribe(function (msg) { return _this.notify(msg); });
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    FitMediatorComponent.prototype.notify = function (msg) {
        if (msg) {
            this.notificationMsg = msg;
            this.mediatorSidenav.open();
        }
    };
    FitMediatorComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'fit-mediator',
                    template: "<md-card id=\"mediator\"> <md-sidenav-container (click)=\"showFitDialog()\" class=\"z-depth-5\"> <md-sidenav mode=\"side\" #mediatorSidenav class=\"md-sidenav-right\" fxLayoutAlign=\"center center\" md-disable-backdrop> <div> {{notificationMsg}} </div> </md-sidenav> <button md-fab class=\"md-fab md-primary pull-right md-raised\">fit</button> </md-sidenav-container> </md-card>",
                    styles: ["#mediator { z-index: 100; padding: 30px; background-color: transparent; position: fixed; bottom: 0px; right: 0px; box-shadow: none; } #mediator .z-depth-1 { box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2); } #mediator .z-depth-2 { box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3); } #mediator .z-depth-3 { box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3); } #mediator .z-depth-4 { box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.3); } #mediator .z-depth-5 { box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3); } #mediator md-sidenav-container { background-color: transparent; border-radius: 26px; } #mediator md-sidenav-container md-sidenav { width: 250px; border-radius: 26px; background-color: transparent; } #mediator md-sidenav-container md-sidenav div { padding: 10px; font-size: 12px; } #mediator md-sidenav-container .mat-sidenav-content { overflow: visible; } #mediator md-sidenav-container button { z-index: 100; } "],
                    encapsulation: _angular_core.ViewEncapsulation.None
                },] },
    ];
    /**
     * @nocollapse
     */
    FitMediatorComponent.ctorParameters = function () { return [
        { type: _angular_material.MdDialog, },
    ]; };
    FitMediatorComponent.propDecorators = {
        'mediatorSidenav': [{ type: _angular_core.ViewChild, args: ['mediatorSidenav',] },],
    };
    return FitMediatorComponent;
}());

var FitDialogComponent = (function () {
    /**
     * @param {?} dialogRef
     * @param {?} dataService
     * @param {?} storeService
     * @param {?} mediator
     * @param {?} iconRegistry
     * @param {?} sanitizer
     * @param {?} translate
     */
    function FitDialogComponent(dialogRef, dataService, storeService, mediator, iconRegistry, sanitizer, translate) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.dataService = dataService;
        this.storeService = storeService;
        this.mediator = mediator;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.translate = translate;
        this.metricUnit = true;
        this.myModel = '';
        this.feetMask = [/\d/, '\'', ' ', /\d/, /\d/, '"'];
        this.inchMask = [/\d/, /\d/, '"'];
        this.lbsMask = [/\d/, /\d/, /\d/, ' lbs'];
        this.translate.addLangs(["en", "fr"]);
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        this.measurements = this.dataService.getMeasurements();
        this.measurementsForm = this.toFormGroup(this.measurements);
        this.shapes = this.dataService.getShapes();
        this.basicInfos = this.dataService.getBasicInfo();
        this.basicInfosForm = this.toFormGroup(this.basicInfos);
        this.basicInfos.forEach(function (basicInfo) {
            _this.iconRegistry.addSvgIcon(basicInfo.svgIcon, _this.sanitizer.bypassSecurityTrustResourceUrl(basicInfo.imgUrl));
        });
        this.bodyShapeList = this.dataService.getBodyShapes();
        this.selectedTab = 1;
    }
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.ngOnInit = function () {
    };
    /**
     * @param {?} f
     * @return {?}
     */
    FitDialogComponent.prototype.test = function (f) {
        alert(f);
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.submitMeasurements = function () {
        var /** @type {?} */ measurements = this.measurements.concat(this.basicInfos);
        var /** @type {?} */ bodySpecs = new Map();
        bodySpecs['measurements'] = measurements;
        bodySpecs['shapes'] = this.shapes;
        this.storeService.submitMeasurements(bodySpecs);
        this.dialogRef.close("Hey! rapelle toi que tu peux venir changer tes mesure n'importe quand ici!");
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    FitDialogComponent.prototype.notify = function (msg) {
        this.mediator.notify(msg);
    };
    /**
     * @param {?} sex
     * @return {?}
     */
    FitDialogComponent.prototype.setSex = function (sex) {
        this.goNext();
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.goNext = function () {
        this.selectedTab = this.selectedTab + 1;
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.goBack = function () {
        this.selectedTab = this.selectedTab - 1;
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.closeDialogBox = function () {
        this.dialogRef.close("");
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FitDialogComponent.prototype.goTo = function (index) {
        this.selectedTab = index;
    };
    /**
     * @param {?} bodyShapeObj
     * @param {?} $event
     * @return {?}
     */
    FitDialogComponent.prototype.setShape = function (bodyShapeObj, $event) {
        this.selectedImgUrl = bodyShapeObj.imgUrl;
        this.goNext();
        this.shapes[0].value = bodyShapeObj.shapeKeyEctomorph;
        this.shapes[1].value = bodyShapeObj.shapeKeyEndomorph;
        this.shapes[2].value = bodyShapeObj.shapeKeyEndomesomorph;
    };
    /**
     * @param {?} array
     * @return {?}
     */
    FitDialogComponent.prototype.toFormGroup = function (array) {
        var /** @type {?} */ group = {};
        array.forEach(function (element) {
            group[element.name] = element.required ? new _angular_forms.FormControl(element.value || '', _angular_forms.Validators.required)
                : new _angular_forms.FormControl(element.value || '');
        });
        return new _angular_forms.FormGroup(group);
    };
    /**
     * @param {?} form
     * @param {?} bodySpec
     * @return {?}
     */
    FitDialogComponent.prototype.getInputPlacerholder = function (form, bodySpec) {
        var /** @type {?} */ formControl = form.controls[bodySpec.name];
        if (formControl && formControl.errors) {
            if (formControl.errors.min)
                return 'Minimum de ' + bodySpec.min;
            if (formControl.errors.max)
                return 'Maximum de ' + bodySpec.max;
        }
        return bodySpec.name;
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.changeUnits = function () {
        this.metricUnit = !this.metricUnit;
    };
    /**
     * @param {?} value
     * @param {?} unit
     * @return {?}
     */
    FitDialogComponent.prototype.setValue = function (value, unit) {
        var /** @type {?} */ total;
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
        return total;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FitDialogComponent.prototype.convertInchToCm = function (value) {
        var /** @type {?} */ inch = Number(value.substring(0, 2));
        inch = math.unit(inch, 'in'); //Creates an inch object from the mathjs library
        return math.to(inch, 'cm');
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FitDialogComponent.prototype.convertFeetToCm = function (value) {
        var /** @type {?} */ feet = Number(value.charAt(0));
        var /** @type {?} */ inch = Number(value.substring(3, 5));
        feet = math.unit(feet, "ft");
        inch = math.unit(inch, 'in');
        var /** @type {?} */ totalInInch = math.add(math.to(feet, 'in'), inch);
        return math.to(totalInInch, 'cm');
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FitDialogComponent.prototype.convertLbsToKg = function (value) {
        var /** @type {?} */ weight = Number(value.substring(0, 3));
        weight = math.unit(weight, 'lbs');
        return math.to(weight, 'kg');
    };
    /**
     * @param {?} value
     * @param {?} unit
     * @return {?}
     */
    FitDialogComponent.prototype.getInImperial = function (value, unit) {
        var /** @type {?} */ valueNotFormatted, /** @type {?} */ mask;
        if (unit === 'in') {
            valueNotFormatted = this.convertToInch(value).toString();
            mask = this.inchMask;
        }
        else if (unit === 'ft') {
            valueNotFormatted = this.convertToFeet(value);
            mask = this.feetMask;
        }
        else if (unit === 'lbs') {
            valueNotFormatted = this.convertToLbs(value).toString();
            mask = this.lbsMask;
        }
        //function from angular-text-mask that will transform the display to follow the style of the mask
        var /** @type {?} */ conformedValue = angular2TextMask.conformToMask(valueNotFormatted, mask, { guide: false });
        return conformedValue.conformedValue;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FitDialogComponent.prototype.convertToLbs = function (value) {
        var /** @type {?} */ weight = math.unit(value, 'lbs');
        var /** @type {?} */ weightInMetric = weight.to('kg');
        return Math.floor(weightInMetric.toNumber());
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FitDialogComponent.prototype.convertToFeet = function (value) {
        var /** @type {?} */ INCHESINAFOOT = 12;
        var /** @type {?} */ num = this.convertToInch(value);
        var /** @type {?} */ feet = Math.floor(num / INCHESINAFOOT).toString();
        var /** @type {?} */ inches = Math.floor(num % INCHESINAFOOT).toString();
        var /** @type {?} */ valueToDisplay = this.formatFeetValue(feet, inches);
        return valueToDisplay;
    };
    /**
     * @param {?} feet
     * @param {?} inches
     * @return {?}
     */
    FitDialogComponent.prototype.formatFeetValue = function (feet, inches) {
        var /** @type {?} */ valueToDisplay = feet.toString();
        if (inches.length == 1) {
            valueToDisplay += "0";
        }
        valueToDisplay += inches;
        return valueToDisplay;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FitDialogComponent.prototype.convertToInch = function (value) {
        var /** @type {?} */ height = math.unit(value, 'cm'); //converts the value from the input to a math obj in cm
        var /** @type {?} */ heightInInches = height.to('in'); // converts from cm to inches
        return heightInInches.toNumber('in');
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.changeLanguage = function () {
        if (this.translate.currentLang == this.translate.getLangs()[0]) {
            this.translate.use(this.translate.getLangs()[1]);
        }
        else {
            this.translate.use(this.translate.getLangs()[0]);
        }
    };
    /**
     * @return {?}
     */
    FitDialogComponent.prototype.getOtherLanguage = function () {
        if (this.translate.currentLang == this.translate.getLangs()[0]) {
            return this.translate.getLangs()[1];
        }
        else {
            return this.translate.getLangs()[0];
        }
    };
    FitDialogComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'fit-dialog',
                    template: "<div id=\"dialog\" fxLayout=\"column\" fxLayoutAlign=\"none center\"> <md-toolbar class=\"transparent\" fxLayout=\"row\" fxLayoutAlign=\"start center\"> <div> <button [disabled]=\"selectedTab <= 1\" fxFlex=\"30px\" class=\"no-padding\" md-button type=\"button\" (click)=\"goBack()\"> <i class=\"material-icons\">navigate_before</i> </button> </div> <div> <button [disabled]=\"selectedTab == 0\" fxFlex=\"30px\" class=\"no-padding\" md-button type=\"button\" (click)=\"goTo(0)\"> <i class=\"material-icons\">view_module</i> </button> </div> <div> <button (click)=\"changeLanguage()\" fxFlex=\"30px\" class=\"no-padding\" md-button type=\"button\"> {{getOtherLanguage()}} </button> </div> <!-- <div> <md-slide-toggle (change)=\"changeUnits()\">imperial</md-slide-toggle> </div> --> <div fxFlex=\"94\"  fxLayoutAlign=\"end none\"> <button fxFlex=\"30px\" class=\"no-padding\" md-button type=\"button\" (click)=\"closeDialogBox()\"> <i class=\"material-icons\">close</i> </button> </div> </md-toolbar> <div> <md-tab-group [(selectedIndex)]=\"selectedTab\"> <md-tab label=\"Menu\"> <ng-container *ngTemplateOutlet=\"menuTab\"></ng-container> </md-tab> <md-tab label=\"Start\"> <ng-container *ngTemplateOutlet=\"startTab\"></ng-container> </md-tab> <md-tab label=\"Sex\"> <ng-container *ngTemplateOutlet=\"sexTab\"></ng-container> </md-tab> <md-tab label=\"basicInfo\"> <ng-container *ngTemplateOutlet=\"basicInfosTab\"></ng-container> </md-tab> <md-tab label=\"Shape\"> <ng-container *ngTemplateOutlet=\"bodyShapesTab\"></ng-container> </md-tab> <md-tab label=\"Measurements\"> <ng-container *ngTemplateOutlet=\"measurementsTab\"></ng-container> </md-tab> <md-tab label=\"End\"> <ng-container *ngTemplateOutlet=\"endTab\"></ng-container> </md-tab> </md-tab-group> </div> </div> <ng-template #menuTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center none\"> <h1>Menu</h1> <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\"> <div> <button md-button (click)=\"goTo(2)\">sex</button> </div> <div> <button md-button (click)=\"goTo(3)\">basicInfos</button> </div> <div> <button md-button (click)=\"goTo(4)\">shape</button> </div> <div> <button md-button (click)=\"goTo(5)\">measurements</button> </div> </div> </md-card> </ng-template> <ng-template #startTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center none\"> <h1>{{'HOME.START' | translate}}</h1> <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\"> <div fxFlex=\"90\"> <p>{{'HOME.FIRST' | translate}}</p> <p>{{'HOME.SECOND' | translate}}</p> </div> <ng-container *ngTemplateOutlet=\"nextButton\"></ng-container> </div> </md-card> </ng-template> <ng-template #sexTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center none\"> <h1>{{'SEX.QUESTION' | translate}}</h1> <div fxLayout=\"row\"> <div fxLayout=\"row\" fxAlign=\"center center\" class=\"btn-sex-div\"> <button md-button type=\"button\" (click)=\"setSex('h')\">{{'SEX.MEN' | translate}}</button> </div> <div fxLayout=\"row\" fxAlign=\"center center\" class=\"btn-sex-div\"> <button md-button type=\"button\" (click)=\"setSex('f')\">{{'SEX.WOMEN' | translate}}</button> </div> </div> </md-card> </ng-template> <ng-template #basicInfosTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center none\"> <h1>{{'INFO.ENTER' | translate}}</h1> <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\"> <form fxFlex=\"80\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\" [formGroup]=\"basicInfosForm\"> <div fxFlex=\"26\" *ngFor=\"let basicInfo of basicInfos\"> <md-icon [svgIcon]=\"basicInfo.svgIcon\"></md-icon> <div *ngIf=\"metricUnit; else imperialBlock;\">  <div *ngIf=\"basicInfo.name == 'age';\"> <md-input-container> <input mdInput [min]=\"basicInfo.min\" [max]=\"basicInfo.max\" [formControlName]=\"basicInfo.name\" [placeholder]=\"getInputPlacerholder(basicInfosForm, basicInfo)\" [(ngModel)]=\"basicInfo.value\" type=\"number\" required> </md-input-container> </div> <div *ngIf=\"basicInfo.imperialUnit == 'ft';\"> <md-input-container> <input mdInput [min]=\"basicInfo.min\" [max]=\"basicInfo.max\" [formControlName]=\"basicInfo.name\" [placeholder]=\"getInputPlacerholder(basicInfosForm, basicInfo)\" [(ngModel)]=\"basicInfo.value\" type=\"number\" required> <span mdSuffix>cm</span> </md-input-container> </div> <div *ngIf=\"basicInfo.imperialUnit == 'lbs';\"> <md-input-container> <input mdInput [min]=\"basicInfo.min\" [max]=\"basicInfo.max\" [formControlName]=\"basicInfo.name\" [placeholder]=\"getInputPlacerholder(basicInfosForm, basicInfo)\" [(ngModel)]=\"basicInfo.value\" type=\"number\" required> <span mdSuffix>lbs</span> </md-input-container> </div> </div>  <ng-template #imperialBlock> <div *ngIf=\"basicInfo.name == 'age';\"> <md-input-container> <input mdInput [min]=\"basicInfo.min\" [max]=\"basicInfo.max\" [formControlName]=\"basicInfo.name\" [placeholder]=\"getInputPlacerholder(basicInfosForm, basicInfo)\" [(ngModel)]=\"basicInfo.value\" type=\"number\" required> </md-input-container> </div> <div *ngIf=\"basicInfo.imperialUnit == 'ft';\"> <md-input-container> <input mdInput [textMask]=\"{mask: feetMask}\" [min]=\"basicInfo.min\" [max]=\"basicInfo.max\" [formControlName]=\"basicInfo.name\" [placeholder]=\"getInputPlacerholder(basicInfosForm, basicInfo)\" [value]=\"getInImperial(basicInfo.value, basicInfo.imperialUnit)\"  (change)=\"basicInfo.value = setValue($event.target.value, basicInfo.imperialUnit)\" required> </md-input-container> </div> <div *ngIf=\"basicInfo.imperialUnit == 'lbs';\"> <md-input-container> <input mdInput [textMask]=\"{mask: lbsMask}\" [min]=\"basicInfo.min\" [max]=\"basicInfo.max\" [formControlName]=\"basicInfo.name\" [placeholder]=\"getInputPlacerholder(basicInfosForm, basicInfo)\" [value]=\"getInImperial(basicInfo.value, basicInfo.imperialUnit)\"  (change)=\"basicInfo.value = setValue($event.target.value, basicInfo.imperialUnit)\" required> </md-input-container> </div> </ng-template>                      </div> </form> <div fxFlex=\"10\"> <button [disabled]=\"!basicInfosForm.valid\" md-fab type=\"button\" (click)=\"goNext()\"> <i class=\"material-icons\">navigate_next</i> </button> </div> </div> </md-card> </ng-template> <ng-template #bodyShapesTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center none\"> <h1>{{'BODY.TYPE' | translate}}</h1> <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\"> <div *ngFor=\"let bodyshape of bodyShapeList\"> <button type=\"button\" md-button (click)=\"setShape(bodyshape,$event)\"> <img class=\"full-width\" [src]=\"bodyshape.imgUrl\"> </button> </div> </div> </md-card> </ng-template> <ng-template #measurementsTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center none\"> <h1>{{'MEASUREMENT.INPUT' | translate}}</h1> <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\"> <div fxFlex=\"80\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\"> <div fxFlex=\"30\"> <img class=\"full-width\" [src]=\"selectedImgUrl\"> </div> <form fxFlex=\"60\" [formGroup]=\"measurementsForm\"> <div *ngFor=\"let measurement of measurements\"> <div *ngIf=\"metricUnit; else imperialBlock;\"> <md-input-container> <input mdInput [min]=\"measurement.min\" [max]=\"measurement.max\" [formControlName]=\"measurement.name\" [placeholder]=\"getInputPlacerholder(measurementsForm, measurement)\" type=\"number\" [(ngModel)]=\"measurement.value\" required> <span mdSuffix>cm</span> </md-input-container> </div> <ng-template #imperialBlock> <md-input-container> <input mdInput [textMask]=\"{mask: inchMask}\" [min]=\"measurement.min\" [max]=\"measurement.max\" [formControlName]=\"measurement.name\" [placeholder]=\"getInputPlacerholder(measurementsForm, measurement)\" [value]=\"getInImperial(measurement.value, measurement.imperialUnit)\"  (change)=\"measurement.value = setValue($event.target.value, measurement.imperialUnit)\" required> </md-input-container> </ng-template>   </div> </form> </div> <div fxFlex=\"10\"> <button md-fab [disabled]=\"!measurementsForm.valid\" type=\"button\" (click)=\"goNext()\"> <i class=\"material-icons\">navigate_next</i> </button> </div> </div> </md-card> </ng-template> <ng-template #endTab> <md-card fxLayout=\"column\" fxLayoutAlign=\"center ce\"> <h1>{{'END.COMPLETE' | translate}}</h1> <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\"> <div> <button md-raised-button type=\"button\" (click)=\"submitMeasurements()\"> {{'END.SHOP' | translate}} </button> </div> </div> </md-card> </ng-template> <ng-template #nextButton> <div fxFlex=\"10\"> <button md-fab type=\"button\" (click)=\"goNext()\" class=\"next-btn\"> <i class=\"material-icons\">navigate_next</i> </button> </div> </ng-template>",
                    styles: ["#dialog { width: 100%; height: 100%; position: relative; } #dialog .sex-content .md-button { line-height: 26px; border-radius: 30px; padding: 0 20px; text-transform: none; } #dialog .next-btn { background-color: #909CB6; color: rgba(0, 0, 0, 0.54); } #dialog .next-btn:hover { background-color: #5E6574; } #dialog .full-height { height: 100%; } #dialog .full-width { width: 100%; } #dialog .no-padding { padding: 0px; } #dialog .transparent { background-color: transparent; } #dialog .mat-tab-list { display: none; } #dialog .mat-tab-header { display: none !important; } #dialog .mat-toolbar-layout { width: 100%; } #dialog md-card { min-width: 72vw; min-height: 63vh; } #dialog md-card h1 { color: #95989A; } #dialog h1 { font-size: 50px; font-weight: 100; } "],
                    encapsulation: _angular_core.ViewEncapsulation.None
                },] },
    ];
    /**
     * @nocollapse
     */
    FitDialogComponent.ctorParameters = function () { return [
        { type: _angular_material.MdDialogRef, },
        { type: DataService, },
        { type: MetaformaService, },
        { type: FitMediatorComponent, },
        { type: _angular_material.MdIconRegistry, },
        { type: _angular_platformBrowser.DomSanitizer, },
        { type: ng2Translate_index.TranslateService, },
    ]; };
    return FitDialogComponent;
}());

/**
 * @param {?} http
 * @return {?}
 */
function createTranslateLoader(http) {
    return new ng2Translate_index.TranslateStaticLoader(http, './assets/i18n', '.json');
}

var FitConnectModule = (function () {
    function FitConnectModule() {
    }
    /**
     * @return {?}
     */
    FitConnectModule.forRoot = function () {
        return {
            ngModule: FitConnectModule,
            providers: [FitMediatorComponent, FitDialogComponent, DataService, MetaformaService]
        };
    };
    FitConnectModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                        _angular_forms.FormsModule,
                        _angular_forms.ReactiveFormsModule,
                        _angular_platformBrowser_animations.BrowserAnimationsModule,
                        _angular_material.MaterialModule,
                        _angular_flexLayout_index.FlexLayoutModule,
                        ng2Validation_dist_index.CustomFormsModule,
                        _angular_forms.FormsModule,
                        angular2TextMask.TextMaskModule,
                        _angular_http.HttpModule,
                        ng2Translate_index.TranslateModule.forRoot({
                            provide: ng2Translate_index.TranslateLoader,
                            useFactory: (createTranslateLoader),
                            deps: [_angular_http.Http]
                        })
                    ],
                    declarations: [
                        FitDialogComponent,
                        FitMediatorComponent,
                    ],
                    exports: [
                        FitDialogComponent,
                        FitMediatorComponent
                    ],
                    providers: [],
                    entryComponents: [FitDialogComponent]
                },] },
    ];
    /**
     * @nocollapse
     */
    FitConnectModule.ctorParameters = function () { return []; };
    return FitConnectModule;
}());

exports.createTranslateLoader = createTranslateLoader;
exports.FitConnectModule = FitConnectModule;
exports.FitMediatorComponent = FitMediatorComponent;
exports.FitDialogComponent = FitDialogComponent;
exports.MetaformaService = MetaformaService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
