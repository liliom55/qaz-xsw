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
// TODO SOMEDAY: Feature Componetized like CrisisCenter
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_service_1 = require("./hero.service");
var HeroListComponent = (function () {
    function HeroListComponent(service, route) {
        this.service = service;
        this.route = route;
    }
    HeroListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes$ = this.route.paramMap
            .switchMap(function (params) {
            // (+) before `params.get()` turns the string into a number
            _this.selectedId = +params.get('id');
            return _this.service.getHeroes();
        });
    };
    return HeroListComponent;
}());
HeroListComponent = __decorate([
    core_1.Component({
        template: "\n    <h2>HEROES</h2>\n    <ul class=\"items\">\n      <li *ngFor=\"let hero of heroes$ | async\"\n        [class.selected]=\"hero.id === selectedId\">\n        <a [routerLink]=\"['/hero', hero.id]\">\n          <span class=\"badge\">{{ hero.id }}</span>{{ hero.name }}\n        </a>\n      </li>\n    </ul>\n\n    <button routerLink=\"/sidekicks\">Go to sidekicks</button>\n  "
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        router_1.ActivatedRoute])
], HeroListComponent);
exports.HeroListComponent = HeroListComponent;
//# sourceMappingURL=hero-list.component.js.map