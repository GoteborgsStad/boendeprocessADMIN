import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  public subj_notification: Subject<string> = new Subject();
  public error_notification: Subject<string> = new Subject();

  constructor() { }
}
