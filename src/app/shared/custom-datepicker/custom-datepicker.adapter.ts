import { NativeDateAdapter } from '@angular/material';

export class CustomDatepickerAdapter extends NativeDateAdapter {

  public getFirstDayOfWeek(): number {
    return 1;
  }

  public format(date: Date, displayFormat: object): string {
    return date.toLocaleString().slice(0, 10);
  }
}
