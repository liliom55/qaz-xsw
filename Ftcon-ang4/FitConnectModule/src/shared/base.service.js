"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var fitEnvironment_1 = require("../environments/fitEnvironment");
var Observable_1 = require("rxjs/Observable");
var BaseService = (function () {
    function BaseService(http) {
        this.http = http;
        this.apiUrl = fitEnvironment_1.fitEnvironment.API_URL; // URL to web api
        this.Authorization = fitEnvironment_1.fitEnvironment.API_AUTH;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': this.Authorization });
    }
    BaseService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    BaseService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable["throw"](error.message || error);
    };
    BaseService = __decorate([
        core_1.Injectable()
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
