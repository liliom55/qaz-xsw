"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var crisis_service_1 = require("./crisis.service");
var CrisisListComponent = (function () {
    function CrisisListComponent(service, route) {
        this.service = service;
        this.route = route;
    }
    CrisisListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.crises$ = this.route.paramMap
            .switchMap(function (params) {
            _this.selectedId = +params.get('id');
            return _this.service.getCrises();
        });
    };
    return CrisisListComponent;
}());
CrisisListComponent = __decorate([
    core_1.Component({
        template: "\n    <ul class=\"items\">\n      <li *ngFor=\"let crisis of crises$ | async\"\n        [class.selected]=\"crisis.id === selectedId\">\n        <a [routerLink]=\"[crisis.id]\">\n          <span class=\"badge\">{{ crisis.id }}</span>{{ crisis.name }}\n        </a>\n      </li>\n    </ul>\n\n    <router-outlet></router-outlet>\n  "
    }),
    __metadata("design:paramtypes", [crisis_service_1.CrisisService,
        router_1.ActivatedRoute])
], CrisisListComponent);
exports.CrisisListComponent = CrisisListComponent;
//# sourceMappingURL=crisis-list.component.js.map