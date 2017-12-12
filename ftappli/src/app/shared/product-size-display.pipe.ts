import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productSizeDisplay'
})
export class ProductSizeDisplayPipe implements PipeTransform {

  transform(size: string, sizeParam: Object | boolean): string {
    if(!sizeParam) {
      return size; //if no transform needed return size as it is
    } 
    let sizePiped: string = '';
    if(sizeParam['separator']) {
      let sizeArray = size.split(sizeParam['separator']['separatorKey']);
      let display: object[] = sizeParam['separator']['display'];
      display.forEach((val, index) => sizePiped += val['display'] ? (val['displayName'] ? `${val['name']}: ` : '') + `${sizeArray[index]},` : '' );
      sizePiped = sizePiped.slice(0, -1); //remove last comma
    }
    return sizePiped;
  }

}
