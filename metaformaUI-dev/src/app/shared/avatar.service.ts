import { Injectable, EventEmitter } from '@angular/core';
import { WebglService } from "app/shared/webgl.service";
import { DataService } from "app/shared/data.service";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
declare var logistik: any;

@Injectable()
export class AvatarService {
    sex: string;
    shapes: Array<any>;
    measurements: Array<any>;
    inventory: Array<any>;
    constructor(private webglService: WebglService, private dataService: DataService) {
        this.shapes = new Array<any>();
        this.measurements = dataService.getMeasurements();
        this.inventory = new Array<any>();
    }


    public initialize(): Observable<any> {
        let observable: Observable<any> = this.webglService.initB4wEngine();
        observable.subscribe(() => {

            logistik.onAvatarReady({
                setProfile: (profile => this.setProfile(profile)),
                applyClothing: (clothing => this.applyClothing(clothing)),
                removeClothing: (clothing => {
                    const toRemove = this.inventory.find(el => {
                        return el.sku == clothing.sku;
                    });
                    this.removeClothing(toRemove);
                }),
                setMeasurements: (logistikMeasurements => {
                    this.onMeasurementsUpdated(logistikMeasurements);
                })
            });
        });
        return observable;
    }

    setProfile(profile: any) {
        this.sex = profile.sex;
        this.webglService.setSex(this.sex);
    }

    onMeasurementsUpdated(measurements) {
        this.undress();
        this.measurements = this.measurements.map(el => {
            let result = measurements.find(m => m.name == el.name);
            if (result)
            el.value = parseInt(result.value);
            return el;
        });
        this.webglService.updateShapeKeys(this.measurements);
    }

    onMeasurementUpdated(measurement) {
        //todo: update the measurement value in this.measurementsy
        this.webglService.updateShapekey(measurement);
    }

    applyClothing(product) {
        product.data_id = this.webglService.addObj(product);
        this.inventory.push(product);
    }

    removeClothing(product) {
        this.inventory = this.removeFromInventory(this.inventory, product);
        return this.webglService.removeObj(product);
    }

    private removeFromInventory(inventory, product) {
        return inventory.filter(el => {
            return el.sku != product.sku;
        })
    }

    private hasLayerAbove(product, inventory) {
        const productsOnSameBodyPart: Array<any> = inventory.filter(el => {
            return el.bodyPart == product.bodyPart;
        });
        const productsAbove = productsOnSameBodyPart.filter(el => {
            return el.layer > product.layer;
        });
        return productsAbove.length > 0;
    }

    undress() {
        this.inventory.forEach((cloth) => {
            this.inventory = this.removeFromInventory(this.inventory, cloth);
            this.webglService.removeObj(cloth);
        })
    }

    getSKUs() {
        const SKUs = this.inventory.filter(product => {
            return product.data_id;
        });
    }
}