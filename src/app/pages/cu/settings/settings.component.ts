import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DeleteMeDialogComponent } from './delete-me-dialog/delete-me-dialog.component';

import { UserService } from '../../../_services/user.service';

import { File } from '../../../_models/file.model';
import { User } from '../../../_models/user/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  public me: User;

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
  ) { }

  public ngOnInit() {
    this._userService.me().subscribe(
      (res) => {
        this.me = res;
      },
      (err) => {
        // Error
      },
      () => { },
    );
  }

  public openDeleteMeDialog() {
    this._dialog.open(DeleteMeDialogComponent, {
      maxWidth: '700px',
      minWidth: '700px',
    });
  }

  public getImage(value: File) {
    this.me.user_detail.image_url    = value.base64;
    this.me.user_detail.image_name   = value.original_name;
  }
}
