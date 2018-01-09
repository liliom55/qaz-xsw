"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var fitEnvironment_1 = require("../environments/fitEnvironment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var store_service_1 = require("../shared/store.service");
var client_model_1 = require("../shared/client.model");
var MoovService = (function (_super) {
    __extends(MoovService, _super);
    function MoovService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.steps = {
            welcome: { index: 0, title: 'MOOV.WELCOME.TITLE', bodys: '', borderColor: '#9D44B7', fontColor: '#CDDC39', btnsCaption: ['MOOV.WELCOME.BUTTON'], imgsUrl: null },
            profile: { index: 2, title: 'MOOV.PROFILE.TITLE', bodys: '', borderColor: '#0F1CF8', fontColor: '#0F1CF8', btnsCaption: ['MOOV.PROFILE.BUTTON'], imgsUrl: null },
            measurements: { index: 3, title: 'MOOV.MEASUREMENTS.TITLE', bodys: '', borderColor: '#CDDC39', fontColor: '#9D44B7', btnsCaption: ['MOOV.MEASUREMENTS.BUTTON1', 'MOOV.MEASUREMENTS.BUTTON2'], imgsUrl: null },
            loading: { index: 4, title: 'MOOV.LOADING.TITLE', bodys: '', borderColor: '#70F5D1', fontColor: '#9D44B7', btnsCaption: [], imgsUrl: null },
            yourFit: { index: 5, title: 'MOOV.YOUR-FIT.TITLE', bodys: 'MOOV.YOUR-FIT.RESULT', borderColor: '#70F5D1', fontColor: '#70F5D1', btnsCaption: ['MOOV.YOUR-FIT.BUTTON1', 'MOOV.YOUR-FIT.BUTTON2'], imgsUrl: null },
            measurementsHowTo: { index: 5, title: 'MOOV.MEASUREMENTS-HOW-TO.TITLE', bodys: ['MOOV.MEASUREMENTS-HOW-TO.BODY1', 'MOOV.MEASUREMENTS-HOW-TO.BODY2'], borderColor: '#CDDC39', fontColor: '', btnsCaption: ['MOOV.MEASUREMENTS-HOW-TO.BUTTON'], imgsUrl: ['./assets/icons/MoovActiveWear.jpg'] },
            fitDescription: { index: 6, title: 'MOOV.FIT-DESCRIPTION.TITLE', bodys: 'MOOV.FIT-DESCRIPTION.BODY', borderColor: '#F18630', fontColor: '#70F5D1', btnsCaption: ['MOOV.FIT-DESCRIPTION.BUTTON'], imgsUrl: null },
            login: { index: 1, title: 'MOOV.LOGIN.TITLE', bodys: '', borderColor: '#F18630', fontColor: '#70F5D1', btnsCaption: ['MOOV.LOGIN.BUTTON'], imgsUrl: null }
        };
        _this.showImageOnStep3 = false;
        _this.account = [
            {
                label: 'MOOV.LOGIN.FORM.EMAIL',
                name: 'Email',
                value: null
            }
        ];
        _this.profile = [
            {
                label: 'MOOV.PROFILE.FORM.INPUT1',
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
                value: null,
                imperialUnit: _this.IMPUNITS[1],
                metricUnit: _this.METUNITS[0],
                min: 147,
                max: 225
            },
            {
                label: 'MOOV.PROFILE.FORM.INPUT2',
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
                value: null,
                imperialUnit: _this.IMPUNITS[2],
                metricUnit: _this.METUNITS[1],
                min: 40,
                max: 300
            }
        ];
        _this.measurements = [
            {
                label: 'MOOV.MEASUREMENTS.FORM.INPUT1',
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.WAIST,
                value: null,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0],
                min: 22,
                max: 152
            },
            {
                label: 'MOOV.MEASUREMENTS.FORM.INPUT2',
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.HIP,
                value: null,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0],
                min: 34,
                max: 168
            }
        ];
        return _this;
    }
    MoovService.prototype.activeColor = function (selectedTab) {
        for (var key in this.steps) {
            if (this.steps.hasOwnProperty(key)) {
                if (this.steps[key].index == selectedTab)
                    return this.steps[key].borderColor;
            }
        }
        return 'red';
    };
    MoovService.prototype.submitMeasurements = function (profileSpecs) {
        var _this = this;
        var myObserver = new Observable_1.Observable(function (observer) {
            var dataCaptures = profileSpecs.profile.concat(profileSpecs.measurements);
            var client_capture_metrics = [];
            dataCaptures.forEach(function (measurement) {
                client_capture_metrics.push(new client_model_1.ClientCaptureMetric(measurement.name, measurement.value));
            });
            var clientCaptureToSend = new client_model_1.ClientCapture(null, _this.client.id, client_capture_metrics);
            _this.clientService.addClientCapture(clientCaptureToSend, _this.client).then(function (clientCapture) {
                _this.match(clientCapture.id, 'Leggings').subscribe(function (result) {
                    console.log(JSON.stringify(result.products[0].product_versions[0].product_version_txtmetadatas[0].value, null, 2));
                    _this.fit = result.products[0].product_versions[0].product_version_txtmetadatas[0].value;
                });
                observer.next();
            });
        });
        return myObserver;
    };
    MoovService.prototype.match = function (clientCapture, productType) {
        var url = this.apiUrl + '/products/match.json';
        var data = {
            capture_id: clientCapture,
            garment_type: productType
        };
        var options = new http_1.RequestOptions({ headers: this.headers });
        return this.http.post(url, data, options)
            .map(function (res) { return res.json(); })["catch"](this.handleErrorObservable);
    };
    MoovService.retailer = 'Moov';
    MoovService.css = 'FitDialog.moov.scss';
    MoovService.html = './FitDialog.moov.html';
    MoovService.logo = '../../assets/icons/moovlogo.png';
    MoovService = __decorate([
        core_1.Injectable()
    ], MoovService);
    return MoovService;
}(store_service_1.StoreService));
exports.MoovService = MoovService;
