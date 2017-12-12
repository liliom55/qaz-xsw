"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var FitDialog_component_1 = require("./../FitDialog/FitDialog.component");
var FitMediatorComponent = (function () {
    function FitMediatorComponent(dialog) {
        this.dialog = dialog;
    }
    FitMediatorComponent.prototype.showFitDialog = function () {
        var _this = this;
        this.notificationMsg = "";
        this.mediatorSidenav.close();
        this.dialogRef = this.dialog.open(FitDialog_component_1.FitDialogComponent, {
            height: '80vh',
            width: '80vw'
        });
        this.dialogRef.afterClosed().subscribe(function (msg) { return _this.notify(msg); });
    };
    FitMediatorComponent.prototype.notify = function (msg) {
        if (msg) {
            this.notificationMsg = msg;
            this.mediatorSidenav.open();
        }
    };
    __decorate([
        core_1.ViewChild('mediatorSidenav')
    ], FitMediatorComponent.prototype, "mediatorSidenav");
    FitMediatorComponent = __decorate([
        core_1.Component({
            selector: 'fit-mediator',
            templateUrl: './FitMediator.component.html',
            styleUrls: ['./FitMediator.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], FitMediatorComponent);
    return FitMediatorComponent;
}());
exports.FitMediatorComponent = FitMediatorComponent;
