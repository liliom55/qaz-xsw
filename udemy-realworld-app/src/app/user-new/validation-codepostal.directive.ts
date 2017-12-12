import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function validPostalCode(codepostalRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const codePostal = control.value;
    const no = codepostalRe.test(codePostal);
    return no ? null : {'invalidCodePostal': {codePostal}};
  };
}


@Directive({
  selector: '[invalidCodePostal]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidationCodePostalDirective, multi: true}]
})
export class ValidationCodePostalDirective implements Validator, OnChanges {
  @Input() invalidCodePostal: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['invalidCodePostal'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = validPostalCode(re);
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
