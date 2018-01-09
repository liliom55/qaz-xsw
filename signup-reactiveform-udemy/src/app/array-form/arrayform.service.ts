import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ArrayformService {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }
  initialForm() {
    return this.form = new FormGroup({
      topics: new FormArray([])
    });
  }
  get topics() {
    return this.form.get('topics') as FormArray;
  }
  // both have the same result just form bulder is more clear-------------------------------
  initialForm2() {
    return this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      contact: new FormGroup({
        email: new FormControl(),
        phone: new FormControl()
      }),
      topics: new FormArray([])
    });
  }
  buildForm() {
    return this.form = this.fb.group({
      name: ['', Validators.required],
      contact: this.fb.group({
        email: [],
        phone: []
      }),
      topics: this.fb.array([])
    });
  }
}
