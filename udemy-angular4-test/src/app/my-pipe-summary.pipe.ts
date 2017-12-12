import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipeSummary'
})
export class MyPipeSummaryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
