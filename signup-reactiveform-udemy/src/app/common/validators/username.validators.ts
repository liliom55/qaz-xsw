import { AbstractControl, ValidationErrors } from '@angular/forms';
export class UsernameValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value && (control.value as string).indexOf(' ') !== -1) {
      return { cannotContainSpace: true };
      // for instance:
      // return {
      //   minlength: {
      //     requiredLength: 10,
      //     actualLength: control.value.length
      //   }
      // }
    }
    return null;
  }
  // simulates an async function to call from server
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'mosh') {
          resolve({ shouldBeUnique: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
