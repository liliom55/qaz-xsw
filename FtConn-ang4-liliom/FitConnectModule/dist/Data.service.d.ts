import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export declare class DataService {
    private http;
    constructor(http: Http);
    IMPUNITS: string[];
    METUNITS: string[];
    BODYSHAPES_TABLE: {
        imgUrl: string;
        shapeKeyEctomorph: number;
        shapeKeyEndomorph: number;
        shapeKeyEndomesomorph: number;
    }[];
    SHAPE_TABLE: {
        name: string;
        shapeKeyName: string;
        value: number;
        min: number;
        max: number;
    }[];
    BASIC_INFO: {
        name: string;
        shapeKeyName: string;
        value: number;
        min: number;
        max: number;
        imgUrl: string;
        svgIcon: string;
        imperialUnit: string;
        metricUnit: string;
    }[];
    MEASUREMENT_TABLE: {
        name: string;
        shapeKeyName: string;
        value: number;
        min: number;
        max: number;
        imperialUnit: string;
        metricUnit: string;
    }[];
    getBodyShapes(): {
        imgUrl: string;
        shapeKeyEctomorph: number;
        shapeKeyEndomorph: number;
        shapeKeyEndomesomorph: number;
    }[];
    getMeasurements(): {
        name: string;
        shapeKeyName: string;
        value: number;
        min: number;
        max: number;
        imperialUnit: string;
        metricUnit: string;
    }[];
    getBasicInfo(): {
        name: string;
        shapeKeyName: string;
        value: number;
        min: number;
        max: number;
        imgUrl: string;
        svgIcon: string;
        imperialUnit: string;
        metricUnit: string;
    }[];
    getShapes(): {
        name: string;
        shapeKeyName: string;
        value: number;
        min: number;
        max: number;
    }[];
    addCapture(measurements: any): Observable<any>;
    private handleErrorObservable(error);
}
