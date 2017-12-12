import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function validPhone(phoneRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const phone = control.value;
    const no = phoneRe.test(phone);
    return no ? null : {'invalidPhone': {phone}};
  };
}


@Directive({
  selector: '[invalidPhone]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidationPhoneDirective, multi: true}]
})
export class ValidationPhoneDirective implements Validator, OnChanges {
  @Input() invalidPhone: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['invalidPhone'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = validPhone(re);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
