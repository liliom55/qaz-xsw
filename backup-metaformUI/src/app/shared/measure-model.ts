export class Range {
    min: number;
    max: number;
}
export class Measurement {
    metrics: string;
    height: Range;
    chest: Range;
    neck: Range;
    hip: Range;
    waist: Range;
    sleeveLength: Range;
}
export class FormMeasure{
    height: number;
    chest: number;
    neck: number;
    hip: number;
    waist: number;
    sleeveLength: number;
    constructor(height,chest,neck,hip,waist,sleeveLength){
        this.height = height;
        this.chest = chest;
        this.neck = neck;
        this.hip = hip;
        this.waist = waist;
        this.sleeveLength = sleeveLength;

    }
}

