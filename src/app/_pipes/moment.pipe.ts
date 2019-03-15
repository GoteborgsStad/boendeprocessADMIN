import { Pipe, PipeTransform } from '@angular/core';

import * as Moment from 'moment-timezone';

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {

  public transform(value: any, format: string): any {
    if (format) {
      return Moment(value).tz('Europe/Stockholm').format(format);
    } else {
      return Moment(value).tz('Europe/Stockholm').format('YYYY-MM-DD');
    }

  }

}
