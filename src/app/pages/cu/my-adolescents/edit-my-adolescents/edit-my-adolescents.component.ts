import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../../_models/user/user.model';
import { NotificationService } from '../../../../_services/notification.service';
import { SharingService } from '../../../../_services/sharing.service';
import { UserService } from '../../../../_services/user.service';
import { DeleteMyAdolescentDialogComponent } from './delete-my-adolescent-dialog/delete-my-adolescent-dialog.component';

@Component({
  selector: 'app-edit-my-adolescents',
  templateUrl: 'edit-my-adolescents.component.html',
})

export class EditMyAdolescentsComponent implements OnInit, OnDestroy {
  public adolescent: User;
  public subscription: Subscription;

  constructor(
    private _router: Router,
    private sharingService: SharingService,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _notificationService: NotificationService,
  ) { }

  public ngOnInit() {
    this.adolescent = this.sharingService.getData();
    // console.log(this.adolescent);
  }

  public ngOnDestroy() {
    // console.log(this.subscription);
    if (this.subscription !== null && typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
  }

  public showDeleteDialog() {
    const dialogRef = this._dialog.open(DeleteMyAdolescentDialogComponent, {
      data: {user: this.adolescent },
      maxWidth: '700px',
      minWidth: '700px',
    });

    const sub: Subscription = dialogRef.componentInstance.reflectGoalTemplate.subscribe(
      (data: { user: User }) => {
        if (data.user) {
          this.deleteUser(data.user);
        }
      });
    this.subscription = dialogRef.afterClosed().subscribe((result: User) => {
      sub.unsubscribe();
    });
  }

  public editAdolescent($event: User) {
    // console.log('To-Be-Updated-User', $event);
    this._userService.updateUser($event).subscribe((data: User) => {
      this._notificationService.subj_notification.next('Ungdom har uppdaterats');
    });
  }

  public deleteUser(user: User) {
    this._userService.deleteUser(user.id).subscribe((data: any) => {
      this._notificationService.subj_notification.next('Ungdom har raderats');
      this._router.navigate(['/cu/minaungdomar']);
    });
  }
}
