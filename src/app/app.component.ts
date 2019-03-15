import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { Cookie } from 'ng2-cookies';
import { NotificationService } from './_services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    public location: Location,
    private _router: Router,
    private _notificationService: NotificationService,
    private _snackBar: MatSnackBar,
  ) {
    this._notificationService.subj_notification.subscribe((message: string) => {
      this._snackBar.open(message, undefined, {
        duration: 5000,
        extraClasses: ['bg-arta'],
      });
    });
    this._notificationService.error_notification.subscribe((message: string) => {
      this._snackBar.open(message, undefined, {
        duration: 5000,
        extraClasses: ['bg-aska'],
      });
    });
  }

  public ngOnInit() {
    const token: string = Cookie.get('id_token');

    if (token) {
      this._router.navigate(['/cu']);
    }

  }

  public isHidden() {
    const list = ['/404'];
    const route = this.location.path();

    return (list.indexOf(route) > -1);
  }
}
