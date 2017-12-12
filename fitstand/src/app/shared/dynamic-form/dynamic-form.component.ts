import { Component, Input, OnChanges }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { FormBase }              from './form-base';
import { FormControlService }    from './form-control.service';
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ FormControlService ]
})
export class DynamicFormComponent implements OnChanges {
  @Input() questions: FormBase<any>[] = [];
  @Input() form: FormGroup;
  constructor(private qcs: FormControlService) {  }
  ngOnChanges()	 {
    this.form = this.qcs.toFormGroup(this.questions);
  }
}