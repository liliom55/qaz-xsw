import { AppConfig } from '../../config/app.config';


import { Injectable }       from '@angular/core';
import { DropdownQuestion } from '../../shared/dynamic-form/form-dropdown';
import { FormBase }     from '../../shared/dynamic-form/form-base';
import { TextboxQuestion }  from '../../shared/dynamic-form/form-textbox';

@Injectable()
export class MeasurementFormService {


  constructor(private config: AppConfig) {}

  //Load and create the dynamic form from config file
  getQuestions(): Promise<Object> {
      return new Promise((resolve, reject) => {
        this.loadQuestion();
      }); 
  }

  loadQuestion(): Object {
    let configQuestions: Object[] = this.config.getConfig('measurements');
    let systems = ['metric', 'imperial'];
    let form = {imperial: [], metric: []};
    for(let g = 0; g<systems.length; g++ ){
        let system = systems[g];
        for(let i=0; i < configQuestions.length; i++){
            let question: Object = configQuestions[i];
            let params = {};
            params = {
                key: question['key'],
                label: question['label'],
                required: question['required'],
                unit: question['unit'][system]
            }
            if(question['params'][system]) {
                let forSys = question['params'][system];
                if(forSys == 'same') { forSys = system == 'metric' ? question['params']['imperial'] : question['params']['metric']; }
                if(forSys['type'] == 'textbox') {
                    params['order'] = forSys['order'];
                    var field: any = new TextboxQuestion(params);
                }
                else if(forSys['type'] == 'dropdown') {
                    params['order'] = forSys['order'];
                    params['options'] = forSys['options'];
                    var field: any = new DropdownQuestion(params);
                }
            }
            else { continue; }
            form[system].push(field);
        }
        form[system] = form[system].sort((a, b) => a.order - b.order);
    }
    return form;
  }

  convertUnit(value: number, targetSystem: string, unit: string): number {
      let convertedValue: number;
      if(targetSystem == 'metric') {
          switch(unit) { // Using switch in case we want to add more values for later
              case 'ft': //Feet
                convertedValue = 0.3 * value;

              default:
                convertedValue = 2.54 * value;
          }

      } else if (targetSystem == 'imperial') {
            switch(unit) {
              default:
                convertedValue = value / 2.54;
          }
      }

      return convertedValue;
  }
}