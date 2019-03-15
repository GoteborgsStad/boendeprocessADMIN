import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sName',
})
export class SNamePipe implements PipeTransform {

  public transform(value: string, args?: any): any {
    if (value.substr(value.length - 1) === 's') {
      return value;
    } else {
      return value + 's';
    }
  }

}
