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
var store_service_1 = require("../shared/store.service");
var fitEnvironment_1 = require("../environments/fitEnvironment");
var Observable_1 = require("rxjs/Observable");
var MetaformaService = (function (_super) {
    __extends(MetaformaService, _super);
    function MetaformaService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.measurementsAdded = new core_1.EventEmitter();
        _this.profile = [
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.AGE,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.AGE,
                value: 25,
                min: 0,
                max: 120,
                imgUrl: './assets/icons/age.svg',
                svgIcon: 'ageIcon',
                imperialUnit: _this.IMPUNITS[3],
                metricUnit: _this.METUNITS[2]
            },
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
                value: 170,
                min: 145,
                max: 210,
                imgUrl: './assets/icons/height.svg',
                svgIcon: 'heightIcon',
                imperialUnit: _this.IMPUNITS[1],
                metricUnit: _this.METUNITS[0]
            },
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
                value: 80,
                min: 69,
                max: 115,
                imgUrl: './assets/icons/weight.svg',
                svgIcon: 'weightIcon',
                imperialUnit: _this.IMPUNITS[2],
                metricUnit: _this.METUNITS[1]
            }
        ];
        _this.measurements = [
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.NECK,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.NECK,
                value: 38,
                min: 25,
                max: 51,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0]
            },
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.CHEST,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.CHEST,
                value: 101,
                min: 42,
                max: 160,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0]
            },
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.WAIST,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.WAIST,
                value: 87,
                min: 22,
                max: 152,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0]
            },
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.HIP,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.HIP,
                value: 101,
                min: 34,
                max: 168,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0]
            },
            {
                name: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
                shapeKeyName: fitEnvironment_1.fitEnvironment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
                value: 87,
                min: 74,
                max: 100,
                imperialUnit: _this.IMPUNITS[0],
                metricUnit: _this.METUNITS[0]
            }
        ];
        _this.preferences = [
            {
                name: 'Fit preference lower body',
                options: [
                    {
                        name: 'loose',
                        value: 'loose'
                    },
                    {
                        name: 'regular',
                        value: 'regular'
                    },
                    {
                        name: 'tight',
                        value: 'tight'
                    },
                ],
                value: 'regular'
            },
            {
                name: 'Fit preference upper body',
                options: [
                    {
                        name: 'loose',
                        value: 'loose'
                    },
                    {
                        name: 'regular',
                        value: 'regular'
                    },
                    {
                        name: 'tight',
                        value: 'tight'
                    },
                ],
                value: 'regular'
            }
        ];
        _this.bodyShapes = [
            {
                imgUrl: './assets/icons/regular.png',
                shapes: {
                    shapeKeyEctomorph: 0.7,
                    shapeKeyEndomorph: 0.7,
                    shapeKeyEndomesomorph: 0.5
                }
            },
            {
                imgUrl: './assets/icons/fat.png',
                shapes: {
                    shapeKeyEctomorph: 0.9,
                    shapeKeyEndomorph: 0.7,
                    shapeKeyEndomesomorph: 0.35
                }
            },
            {
                imgUrl: './assets/icons/muscular.png',
                shapes: {
                    shapeKeyEctomorph: 0,
                    shapeKeyEndomorph: 0,
                    shapeKeyEndomesomorph: 1
                }
            }
        ];
        return _this;
    }
    ;
    MetaformaService.prototype.submitMeasurements = function (profileSpecs) {
        this.measurementsAdded.emit(profileSpecs);
        return new Observable_1.Observable();
    };
    MetaformaService.logo = '../../assets/icons/logistikLogo.png';
    MetaformaService = __decorate([
        core_1.Injectable()
    ], MetaformaService);
    return MetaformaService;
}(store_service_1.StoreService));
exports.MetaformaService = MetaformaService;
