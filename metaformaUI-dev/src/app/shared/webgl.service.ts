import { Injectable, EventEmitter, Output } from '@angular/core';
import { AvatarService } from "app/shared/avatar.service";
import { environment } from "environments/environment";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

declare var UnityLoader: any;

@Injectable()
export class WebglService {
  private onWebglReady: Subject<any> = new Subject<any>();
  private instance: any;

  constructor() {
    //outside of angular cycle:
    UnityLoader.onWebglReady = (() => { this.onWebglReady.next() }) ;
  }

  zoomIn() {
  };

  zoomOut() {
  };

  rotateRight() {
  };
  rotateLeft() {
  };

  initB4wEngine(): Observable<null> {
    this.instance = UnityLoader.instantiate(
      "main_canvas_container",
      "./assets/Build/html.json",
      {
        onProgress: (gameInstance, progress) => this.UnityProgress(this.instance, progress)
      });
    return this.onWebglReady.asObservable();
  }

  UnityProgress(gameInstance, progress) {
    console.log(progress);
  }


  /**
   * update the app's preloader
   */
  private preloader_cb(percentage) {

  }

  private load_avatar(avatar_path) {

  }

  private rotate_object(angle) {

  }

  setSex(sex: string) {
    this.instance.SendMessage('WebAPI', 'SetSex', sex);
  }

  updateShapeKeys(measurements) {
    measurements.forEach(measurement => {
      this.updateShapekey(measurement);
    });
  }

  updateShapekey(measurement) {
    const json = JSON.stringify(measurement);
    this.instance.SendMessage('WebAPI', 'SetMeasurement', json);
  }

  removeObj(product) {
    this.instance.SendMessage('WebAPI', 'Unequip', product.sku);
  }

  addObj(product) {
    const jsonProduct = JSON.stringify(product);
    this.instance.SendMessage('WebAPI', 'Equip', jsonProduct);
  }
}
