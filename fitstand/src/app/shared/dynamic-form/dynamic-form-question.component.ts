import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { FormBase }         from './form-base';
@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.component.html',
  styles: ['md-input-container{width: 100%}']
})
export class DynamicFormQuestionComponent {
  @Input() question: FormBase<any>;
  @Input() form: FormGroup;
  get isValid() { 
    return this.form.controls[this.question.key].valid; 
  }
}