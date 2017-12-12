import { EventEmitter } from '@angular/core';
export declare class MetaformaService {
    measurementsAdded: EventEmitter<Map<string, any>>;
    constructor();
    submitMeasurements(bodySpecs: Map<string, any>): void;
}
