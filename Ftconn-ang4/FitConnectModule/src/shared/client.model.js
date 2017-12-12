"use strict";
// import { Client, ClientMetadata, ClientCapture, ClientCaptureMetric, ClientMetrics }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
//Use decorator JsonProperty to describe how the util should map a Json Object from the server to one of theses classes
//Note: order of definition is important (see https://github.com/jf3096/json-typescript-mapper/issues/19)
//Note: constructors are used in the json-mapper (new Clazz()); careful when changing them
var map_utils_1 = require("../helpers/map.utils");
var ClientMetadata = (function () {
    function ClientMetadata(name, value, clientId) {
        this.id = undefined;
        this.clientId = undefined;
        this.name = undefined;
        this.value = undefined;
        this.created = undefined;
        this.modified = undefined;
        if (name) {
            this.name = name;
        }
        if (value) {
            this.value = value;
        }
        if (clientId) {
            this.clientId = clientId;
        }
    }
    __decorate([
        map_utils_1.JsonProperty({ name: 'client_id' })
    ], ClientMetadata.prototype, "clientId");
    return ClientMetadata;
}());
exports.ClientMetadata = ClientMetadata;
var ClientCaptureMetric = (function () {
    function ClientCaptureMetric(type, value) {
        this.id = undefined;
        this.clientCaptureId = undefined;
        this.type = undefined;
        this.value = undefined;
        this.created = undefined;
        this.modified = undefined;
        if (type) {
            this.type = type;
        }
        if (value || value == 0) {
            this.value = value;
        }
    }
    ClientCaptureMetric.prototype.readyToSend = function () {
        return {
            type: this.type, value: this.value
        };
    };
    __decorate([
        map_utils_1.JsonProperty({ name: 'client_capture_id' })
    ], ClientCaptureMetric.prototype, "clientCaptureId");
    return ClientCaptureMetric;
}());
exports.ClientCaptureMetric = ClientCaptureMetric;
var ClientCapture = (function () {
    function ClientCapture(id, clientId, clientCaptureMetrics) {
        this.id = undefined;
        this.clientId = undefined;
        this.clientCaptureMetrics = undefined;
        this.created = undefined;
        this.modified = undefined;
        if (id)
            this.id = id;
        if (clientId)
            this.clientId = clientId;
        if (clientCaptureMetrics)
            this.clientCaptureMetrics = clientCaptureMetrics;
    }
    __decorate([
        map_utils_1.JsonProperty({ name: 'client_id' })
    ], ClientCapture.prototype, "clientId");
    __decorate([
        map_utils_1.JsonProperty({ name: 'client_capture_metrics', clazz: ClientCaptureMetric })
    ], ClientCapture.prototype, "clientCaptureMetrics");
    return ClientCapture;
}());
exports.ClientCapture = ClientCapture;
var Client = (function () {
    function Client() {
        this.id = undefined;
        this.email = undefined;
        this.password = undefined;
        this.firstname = undefined;
        this.lastname = undefined;
        this.anonymous = undefined;
        this.created = undefined;
        this.modified = undefined;
        this.clientMetadatas = undefined;
        this.clientMetrics = undefined;
    }
    __decorate([
        map_utils_1.JsonProperty({ name: "client_metrics" })
    ], Client.prototype, "clientMetrics");
    __decorate([
        map_utils_1.JsonProperty({ name: "client_metadatas", clazz: ClientMetadata })
    ], Client.prototype, "clientMetadatas");
    return Client;
}());
exports.Client = Client;
