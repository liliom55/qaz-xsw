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
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var client_model_1 = require("./client.model");
//Use MapUtils to serialize JSON response from the server to a class object
var map_utils_1 = require("../helpers/map.utils");
var base_service_1 = require("./base.service");
var ClientService = (function (_super) {
    __extends(ClientService, _super);
    function ClientService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientService.prototype.editClient = function (id, fields) {
        var _this = this;
        return this.http
            .post(this.apiUrl + "/clients/edit/" + id + ".json", JSON.stringify(fields), { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.handleClient(res.json()); })["catch"](this.handleError);
    };
    ClientService.prototype.checkExist = function (email) {
        var _this = this;
        return this.http
            .post(this.apiUrl + "/clients/exists.json", JSON.stringify({ email: email }), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            return res.json().client ?
                { client: _this.handleClient(res.json()), hasPassword: res.json().client.has_password } :
                { client: false, hasPassword: false };
        })["catch"](this.handleError);
    };
    ClientService.prototype.password = function (id, password) {
        return this.http
            .post(this.apiUrl + "/clients/password.json", JSON.stringify({ id: id, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    };
    ClientService.prototype.addClient = function (client) {
        var _this = this;
        var salut = JSON.stringify(map_utils_1.MapUtils.serialize(client_model_1.Client, client));
        console.log(salut);
        return this.http
            .post(this.apiUrl + "/clients/add.json", JSON.stringify(map_utils_1.MapUtils.serialize(client_model_1.Client, client)), { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.handleClient(res.json()); })["catch"](this.handleError);
    };
    ClientService.prototype.addClientCapture = function (clientCapture, client) {
        var _this = this;
        //clientCapture.clientId = client.id;
        //PATCH
        var clientCaptureToSend = map_utils_1.MapUtils.serialize(client_model_1.ClientCapture, clientCapture);
        clientCaptureToSend['client_id'] = client.id;
        return this.http
            .post(this.apiUrl + "/clientCaptures/add.json", clientCaptureToSend, { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.handleClientCapture(res.json()); })["catch"](this.handleError);
    };
    ClientService.prototype.editClientCapture = function (clientCapture) {
        var _this = this;
        // console.log(clientCapture);
        return this.http
            .post(this.apiUrl + "/clientCaptures/edit/" + clientCapture.id + ".json", JSON.stringify(map_utils_1.MapUtils.serialize(client_model_1.ClientCapture, clientCapture)), { headers: this.headers })
            .toPromise()
            .then(function (res) { return _this.handleClientCapture(res.json()); })["catch"](this.handleError);
    };
    ClientService.prototype.getClientCapture = function (client, garmentType) {
        var jsonToSend = {
            "client_id": client.id,
            "garment_type": garmentType
        };
        return this.http
            .post(this.apiUrl + "/clientCaptures/lastInContext.json", JSON.stringify(jsonToSend), { headers: this.headers })
            .toPromise()
            .then(function (captureObject) { return captureObject.json(); })["catch"](this.handleError);
    };
    ClientService.prototype.handleClient = function (clientJson) {
        //this.handleClientCapture(clientJson['client']['clientCapture']);
        if (clientJson['client']) {
            var client = map_utils_1.MapUtils.deserialize(client_model_1.Client, clientJson['client']);
            return client;
        }
    };
    //  private updateClientCapture(clientMetrics:object){
    //     if(clientMetrics){
    //         if(clientMetrics['breast_band_size']){
    //             clientMetrics['breast_band_size']
    //         }
    //     }
    //  } 
    ClientService.prototype.handleClientCapture = function (clientCaptureJson) {
        if (clientCaptureJson['clientCapture']) {
            var clientCapture = map_utils_1.MapUtils.deserialize(client_model_1.ClientCapture, clientCaptureJson['clientCapture']);
            return clientCapture;
        }
    };
    ClientService = __decorate([
        core_1.Injectable()
    ], ClientService);
    return ClientService;
}(base_service_1.BaseService));
exports.ClientService = ClientService;
