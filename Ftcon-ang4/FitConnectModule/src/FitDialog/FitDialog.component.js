"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var fitEnvironment_1 = require("./../environments/fitEnvironment");
var core_1 = require("@angular/core");
var store_service_1 = require("./../shared/store.service");
var forms_1 = require("@angular/forms");
var unit_conversion_service_1 = require("./unit-conversion.service");
//declaring the component object in a var before @Component is the only way to use resource files dependency injection
//using the content of component inside @Component would throw fitEnvironment is undefined
var component = {
    selector: 'fit-dialog',
    templateUrl: fitEnvironment_1.fitEnvironment.store.html,
    styleUrls: [fitEnvironment_1.fitEnvironment.store.css],
    encapsulation: core_1.ViewEncapsulation.None,
    providers: [unit_conversion_service_1.UnitConversionService, { provide: store_service_1.StoreService, useClass: fitEnvironment_1.fitEnvironment.store }]
};
var FitDialogComponent = (function () {
    function FitDialogComponent(dialogRef, store, mediator, iconRegistry, sanitizer, translate, unitConversionService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.store = store;
        this.mediator = mediator;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.translate = translate;
        this.unitConversionService = unitConversionService;
        this.bodyShape = {};
        this.myModel = '';
        this.translate.addLangs(['en', 'fr']);
        this.translate.setDefaultLang('fr');
        this.accountForm = this.toFormGroup(this.store.account);
        this.measurementsForm = this.toFormGroup(this.store.measurements);
        this.preferencesForm = this.toFormGroup(this.store.preferences);
        this.profileForm = this.toFormGroup(this.store.profile);
        this.store.profile.forEach(function (basicInfo) {
            _this.iconRegistry.addSvgIcon(basicInfo.svgIcon, _this.sanitizer.bypassSecurityTrustResourceUrl(basicInfo.imgUrl));
        });
        this.selectedTab = 0;
    }
    FitDialogComponent.prototype.ngOnInit = function () {
        this.logoUrl = fitEnvironment_1.fitEnvironment.store.logo;
    };
    FitDialogComponent.prototype.test = function (email) {
        var _this = this;
        this.store.addClient(email).subscribe(function () { return _this.goNext(); });
    };
    FitDialogComponent.prototype.submitMeasurements = function (clientCapture) {
        var _this = this;
        this.store.submitMeasurements(clientCapture).subscribe(function () { return _this.goNext(); });
        /*let measurements = this.store.measurements.concat(this.store.profile);
        let bodySpecs: Map<string, any> = new Map<string, any>();
        bodySpecs['sex'] = this.sex;
        bodySpecs['measurements'] = measurements;
        bodySpecs['shapes'] = this.bodyShape.shapes;
        bodySpecs['preferences'] = this.store.preferences;
        this.store.submitMeasurements(bodySpecs);
        this.dialogRef.close('Hey! rapelle toi que tu peux venir changer tes mesure n\'importe quand ici!');*/
    };
    FitDialogComponent.prototype.notify = function (msg) {
        this.mediator.notify(msg);
    };
    FitDialogComponent.prototype.setSex = function (sex) {
        this.sex = sex;
        this.goNext();
    };
    FitDialogComponent.prototype.goTo = function (tabName) {
        this.selectedTab = this.store.steps[tabName].index;
    };
    FitDialogComponent.prototype.goNext = function () {
        this.selectedTab = this.selectedTab + 1;
    };
    FitDialogComponent.prototype.exit = function () {
        location.reload();
    };
    FitDialogComponent.prototype.goNextToFakeLoading = function () {
        var _this = this;
        this.selectedTab = this.selectedTab + 1;
        setTimeout(function () {
            _this.goNext();
        }, 3000);
    };
    FitDialogComponent.prototype.goBack = function () {
        this.selectedTab = this.selectedTab - 1;
        var colorBorder = this.store.steps[this.selectedTab].borderColor;
        document.getElementsByTagName('fit-dialog')[0].parentElement.style.borderColor = colorBorder;
    };
    FitDialogComponent.prototype.closeDialogBox = function () {
        this.dialogRef.close('');
    };
    FitDialogComponent.prototype.toFormGroup = function (array) {
        var group = {};
        array.forEach(function (element) {
            group[element.name] = element.required ? new forms_1.FormControl(element.value || '', forms_1.Validators.required)
                : new forms_1.FormControl(element.value || '');
        });
        return new forms_1.FormGroup(group);
    };
    FitDialogComponent.prototype.getInputPlacerholder = function (form, input) {
        var error = this.getError(form, input);
        if (error)
            return error;
        return input.name;
    };
    FitDialogComponent.prototype.getError = function (form, input) {
        var formControl = form.controls[input.name];
        if (formControl && !formControl.valid) {
            if (formControl.errors.min)
                return 'Minimum de ' + this.getInImperial(input.min, input.imperialUnit);
            if (formControl.errors.max)
                return 'Maximum de ' + this.getInImperial(input.max, input.imperialUnit);
        }
        return null;
    };
    // Boolean check to switch between the 2 formats of unit display
    FitDialogComponent.prototype.changeUnits = function () {
        this.unitConversionService.changeUnits();
    };
    FitDialogComponent.prototype.isMetric = function () {
        return this.unitConversionService.metricUnit;
    };
    // Converts the measurements from inches to cm and returns it to the value of the
    // measurement without changing the model
    FitDialogComponent.prototype.setValue = function (value, unit) {
        var converted = this.unitConversionService.setValue(value, unit);
        console.log(converted);
        return converted;
    };
    // Getter to display in the input field the value following a certain mask
    FitDialogComponent.prototype.getInImperial = function (value, unit) {
        return this.unitConversionService.getInImperial(value, unit);
    };
    FitDialogComponent.prototype.changeLanguage = function () {
        if (this.translate.currentLang === this.translate.getLangs()[0]) {
            this.translate.use(this.translate.getLangs()[1]);
        }
        else {
            this.translate.use(this.translate.getLangs()[0]);
        }
    };
    // Gets the language not currently in used to display as an option to the user
    FitDialogComponent.prototype.getOtherLanguage = function () {
        if (this.translate.currentLang === this.translate.getLangs()[0]) {
            return this.translate.getLangs()[1];
        }
        else {
            return this.translate.getLangs()[0];
        }
    };
    FitDialogComponent = __decorate([
        core_1.Component(component)
    ], FitDialogComponent);
    return FitDialogComponent;
}());
exports.FitDialogComponent = FitDialogComponent;
