import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe  implements PipeTransform {
  public transform(values: any[], [pagination, term, statusKey]): any {
      if (values !== undefined && pagination !== undefined) {
        const temp = values.filter(
          (value: any, key: number) => {
            if (value[statusKey].name === term || term === undefined || term === 'Alla') {
              return value;
            }
          },
        );

        values = temp.filter(
          (value: any, key: number) => {
            const max = (pagination.pageSize * (pagination.pageIndex + 1));
            const min = max - pagination.pageSize;

            if (key >= min && key < max) {
              return value;
            }
          },
        );
      }

      return values;
  }
}
