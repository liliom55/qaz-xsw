import { Observable } from "rxjs/Observable";

export class StoreService {
    public static css: string = "FitDialog.default.scss";
    public static html: string = "FitDialog.default.html";
    public static logo: string = '';
    public steps = [];
    public formSteps = [];
    public units = [];
    public showImageOnStep3 = false;
    public preferences: Array<any>;
    public profile: Array<any>;
    public measurements: Array<any>;
    public bodyShapes: Array<any>;
    submitMeasurements (profileSpecs: Map<any, any>):any{};
}