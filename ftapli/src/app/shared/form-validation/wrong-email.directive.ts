import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function emailValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const email = control.value;
    const no = pattern.test(email);
    return no ? null : {'wrongEmail': {email}};
  };
}
@Directive({
  selector: '[wrongEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WrongEmailDirective, multi: true }]
})
export class WrongEmailDirective implements Validator, OnChanges {
  @Input() wrongEmail: string;
  private valFn = Validators.nullValidator;
   ngOnChanges(changes: SimpleChanges): void {
  }
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
