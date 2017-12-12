import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { AppConfig }  from '../../config/app.config';
import { CustomRouting } from '../../shared/custom-routing/custom-routing';

@Injectable()
export class HomeRoutingService {

  appType: string;

  //Previous as an array so we can have a history of navigation
  homeRouting = new CustomRouting([], null);
  current: string;
  previous: string[] = [];

  //Routing depends on these parameters
  routingParameters: Object = {
    app: <string>undefined,
    anonymous:  <boolean>undefined,
    hasPassword: <boolean>undefined,
    exists: <boolean>undefined,
    previousMeasurementChoice: <string>undefined
  }

    // Observable string sources
    private routeEmitter = new Subject<string>();
    // Observable string streams
    routeEmmitter$ = this.routeEmitter.asObservable();

  constructor( private config: AppConfig ) {
    this.appType = config.getConfig('app');
    this.routingParameters['app'] = this.appType;
  }




  next(current: string, routingParameter?: Object): void {
    // console.log("CURRENT",current);
    // console.log("PARAMETERS",routingParameter);
    this.homeRouting.current = current;
    console.log(`Leaving view: ${this.homeRouting.current}`);

    //Update routingParameters
    if(routingParameter) {
      for (let param in routingParameter) {
        this.routingParameters[param] = routingParameter[param];
      }
    }

    //Routing config here for scan and stand-alone version
    switch(current) {

      case 'EmailFormComponent':
        if(!this.routingParameters['anonymous']) {
            if(this.routingParameters['exists']) {
              if(this.routingParameters['hasPassword']) {
                this.current = 'PasswordAuthentificationComponent';
              } else {
                this.current = 'PasswordRegistrationComponent';
              }
            }else {
              this.current = 'MeasurementFormComponent';
            }
        }
        else {
          if(this.routingParameters['app'] === 'fitRoom') {
            this.current = 'BodyTypeComponent';
          } else if(this.routingParameters['app'] === 'fitStand') {
            this.current = 'BodyTypeComponent';
          }
        }
        break;

      case 'PasswordAuthentificationComponent':
        this.current = 'MeasurementHistoryComponent';
        break;

      case 'PasswordRegistrationComponent':
        this.current = 'MeasurementHistoryComponent';
        break;

      case 'MeasurementHistoryComponent':
        if(this.routingParameters['previousMeasurementChoice'] === 'new') {
          if(this.routingParameters['app'] === 'fitRoom') {
            this.current = 'ScanInstructionComponent';
          }
          else if(this.routingParameters['app'] === 'fitStand') {
            this.current = 'BodyTypeComponent';
          }
        }else {
          this.current = 'LoaderComponent';
        }
        break;

      case 'MeasurementFormComponent':
        this.current = "LoaderComponent";
        break;

      case 'BodyTypeComponent':
        if(this.routingParameters['app'] === 'fitRoom') {
          this.current = 'ScanInstructionComponent';
        }
        else if(this.routingParameters['app'] === 'fitStand') {
          this.current = 'MeasurementFormComponent';
        }
        break;

      case 'ScanInstructionComponent':
        this.current = 'ScanComponent';
        break;

      case 'ScanComponent':
        this.current = 'LoaderComponent';
        break;


    }
    this.emit()
    this.homeRouting.previous.push(current);
  }

  back(target?: string): void {
    let indexTarget: number;
    if(this.homeRouting.previous.length !== 0) {
      indexTarget = target ? this.homeRouting.previous.findIndex(previousElement => previousElement == target) : this.homeRouting.previous.length - 1;
      if(indexTarget) {
        this.current = this.homeRouting.previous[indexTarget];
        this.homeRouting.previous.splice(indexTarget);
      } else { // if indexTarget is undefined it means that it is not present in the Array of this.previous so we redirect directly to target
        this.current = target;
      }
    }
    else {
      this.current = target;
    }
    this.emit();
  }

  emit() {
    //console.log(this.homeRouting.previous);
    this.routeEmitter.next(this.current);
  }


}
