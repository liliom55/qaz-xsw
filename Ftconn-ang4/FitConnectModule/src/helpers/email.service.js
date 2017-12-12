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
var base_service_1 = require("../base.service");
var EmailService = (function (_super) {
    __extends(EmailService, _super);
    function EmailService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.email = {
            enabled: true,
            emailContext: "sxsw"
        };
        return _this;
    }
    EmailService.prototype.sendEmail = function (retailer, app, client, productVersionIds) {
        if (this.email.enabled && client.email) {
            return this.http
                .post(this.apiUrl + "/clients/email.json", JSON.stringify({
                client_id: client.id,
                template_name: this.email.emailContext,
                data: {
                    retailerApp: retailer,
                    fromApp: app,
                    products: {
                        product_versions: productVersionIds
                    }
                }
            }), { headers: this.headers })
                .toPromise()
                .then(function (res) { return res.json(); })["catch"](this.handleError);
        }
    };
    EmailService = __decorate([
        core_1.Injectable()
    ], EmailService);
    return EmailService;
}(base_service_1.BaseService));
exports.EmailService = EmailService;
