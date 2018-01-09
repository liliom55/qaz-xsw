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
var base_service_1 = require("./base.service");
var client_model_1 = require("./client.model");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var StoreService = (function (_super) {
    __extends(StoreService, _super);
    function StoreService(http, clientService) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.clientService = clientService;
        _this.steps = {};
        _this.IMPUNITS = ['in', 'ft', 'lbs', ""];
        _this.METUNITS = ['cm', 'kg', ""];
        _this.showImageOnStep3 = false;
        _this.account = [];
        _this.preferences = [];
        _this.profile = [];
        _this.measurements = [];
        _this.bodyShapes = [];
        _this.client = new client_model_1.Client();
        return _this;
    }
    StoreService.prototype.submitMeasurements = function (profileSpecs) {
        return new Observable_1.Observable();
    };
    ;
    StoreService.prototype.addClient = function (email) {
        var _this = this;
        var myObserver = new Observable_1.Observable(function (observer) {
            _this.client.email = email;
            _this.clientService.checkExist(_this.client.email).then(function (result) {
                var clientExist = result['client'];
                if (clientExist) {
                    _this.client = clientExist;
                    observer.next();
                }
                else {
                    _this.clientService.addClient(_this.client).then(function (client) {
                        console.log("salut");
                        _this.client = client;
                        observer.next();
                    });
                }
            });
        });
        return myObserver;
    };
    StoreService.retailer = 'Default';
    StoreService.app = 'FitConnect';
    StoreService.css = "FitDialog.default.scss";
    StoreService.html = "FitDialog.default.html";
    StoreService.logo = '';
    StoreService = __decorate([
        core_1.Injectable()
    ], StoreService);
    return StoreService;
}(base_service_1.BaseService));
exports.StoreService = StoreService;
