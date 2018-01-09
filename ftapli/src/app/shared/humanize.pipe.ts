import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanize'
})
export class HumanizePipe implements PipeTransform {

  transform(str: string): string {
    let frags = str.split('_');
    for (let i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');  }
}
