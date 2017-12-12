import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, args?: any): any {

    if (items && args) {
      return items.filter(user =>{
        return user.name.toLowerCase().indexOf(args.toLowerCase()) !== -1;
      });
    } else {
      return items;
    }
  }

}
