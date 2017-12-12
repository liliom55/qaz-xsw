import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function existPasswordValidator(clntId, clntSrv): ValidatorFn {
  return  (control: AbstractControl): { [key: string]: any } => {
    const inputPassword = control.value;
    return new Promise((resolve, reject) => {
       clntSrv.password(clntId, inputPassword)
        .then(res => {
          if (res) {
            resolve(null);
          } else {
            resolve({ 'wrongPassword': { inputPassword } });
          }
        });
    });
  };
}
@Directive({
  selector: '[wrongPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WrongPasswordDirective, multi: true }]
})
export class WrongPasswordDirective implements Validator, OnChanges {
  @Input() wrongPassword: string;
  private valFn = Validators.nullValidator;
   ngOnChanges(changes: SimpleChanges): void {
  }
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
