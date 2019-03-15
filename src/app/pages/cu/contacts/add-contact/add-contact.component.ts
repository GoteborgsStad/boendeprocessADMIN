import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../../../_services/notification.service';
import { UserService } from '../../../../_services/user.service';
import { RegUser } from './../../../../_models/user/reg-user.model';
import { UserType } from './../../../../_models/user/user-type.enum';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
})
export class AddContactComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _location: Location,
    private _notificationService: NotificationService,
  ) { }

  public ngOnInit() {
    // console.log("test", "Hello add contact");
  }

  public addContact($event: RegUser) {
    this._userService.registerUser($event, UserType.contactUser).subscribe((data: any) => {
      this._notificationService.subj_notification.next('Kontaktperson har skapats');
      this._location.back();
    },
      (err: Error) => {
        this._notificationService.error_notification.next('Ett fel har inträffat');
      });
  }

  public goBack() {
    this._location.back();
  }

}
