import { Injectable, EventEmitter } from '@angular/core';
import { StoreService } from "./store.service";
import { fitEnvironment } from "./../environments/fitEnvironment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MetaformaService extends StoreService {
    public static logo: string = '../../assets/icons/logistikLogo.png';
    
    public measurementsAdded: EventEmitter<Map<string, any>> = new EventEmitter();

    public profile = [
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.AGE,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.AGE,
            value: 25,
            min: 0,
            max: 120,
            imgUrl: './assets/icons/age.svg',
            svgIcon: 'ageIcon',
            imperialUnit: this.IMPUNITS[3],
            metricUnit: this.METUNITS[2]
        },
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
            value: 170,
            min: 145,
            max: 210,
            imgUrl: './assets/icons/height.svg',
            svgIcon: 'heightIcon',
            imperialUnit: this.IMPUNITS[1],
            metricUnit: this.METUNITS[0]
        },
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
            value: 80,
            min: 69,
            max: 115,
            imgUrl: './assets/icons/weight.svg',
            svgIcon: 'weightIcon',
            imperialUnit: this.IMPUNITS[2],
            metricUnit: this.METUNITS[1]
        }
    ];
    public measurements = [
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.NECK,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.NECK,
            value: 38,
            min: 25,
            max: 51,
            imperialUnit: this.IMPUNITS[0],
            metricUnit: this.METUNITS[0]
        },
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.CHEST,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.CHEST,
            value: 101,
            min: 42,
            max: 160,
            imperialUnit: this.IMPUNITS[0],
            metricUnit: this.METUNITS[0]
        },
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.WAIST,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.WAIST,
            value: 87,
            min: 22,
            max: 152,
            imperialUnit: this.IMPUNITS[0],
            metricUnit: this.METUNITS[0]
        },
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.HIP,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.HIP,
            value: 101,
            min: 34,
            max: 168,
            imperialUnit: this.IMPUNITS[0],
            metricUnit: this.METUNITS[0]
        },
        {
            name: fitEnvironment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
            shapeKeyName: fitEnvironment.SHAPE_KEY_NAMES.SLEEVE_LENGTH,
            value: 87,
            min: 74,
            max: 100,
            imperialUnit: this.IMPUNITS[0],
            metricUnit: this.METUNITS[0]
        }
    ];

    public preferences = [
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

    public bodyShapes = [
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

    submitMeasurements(profileSpecs: Map<any, any>): Observable<any>{
        this.measurementsAdded.emit(profileSpecs);
        return new Observable();
    }

}
