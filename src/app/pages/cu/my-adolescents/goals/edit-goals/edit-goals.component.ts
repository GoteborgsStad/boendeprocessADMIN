import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GoalForm } from '../../../../../_models/goal/goal-form.model';
import { Goal } from '../../../../../_models/goal/goal.model';
import { User } from '../../../../../_models/user/user.model';
import { GoalService } from '../../../../../_services/goal.service';
import { NotificationService } from '../../../../../_services/notification.service';
import { UserService } from '../../../../../_services/user.service';
import { DeleteGoalDialogComponent } from './delete-goal-dialog/delete-goal-dialog.component';

@Component({
  selector: 'app-edit-goals',
  templateUrl: './edit-goals.component.html',
})
export class EditGoalsComponent implements OnInit {

  public user: User;
  public goal: Goal;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              public fb: FormBuilder,
              private _dialog: MatDialog,
              public _goalService: GoalService,
              private _notificationService: NotificationService,
              private _location: Location) { }

  public ngOnInit() {
    this._route.parent.params.subscribe((data: any) => {
      this._userService.getUserById(data.id).subscribe((user: User) => this.user = user);
    });
    this._goalService.getGoal(+this._route.snapshot.paramMap.get('id')).subscribe((data: Goal) => this.goal = data);
  }

  public finishGoal() {
    this._goalService.finishGoal(this.goal.id).subscribe((data: any) => {
      this._notificationService.subj_notification.next('Målet är markerat som klart');
      this.back();
    });
  }

  public editGoal($event: GoalForm) {
    $event.goal_status_id = this.goal.goal_status.id;
    this._goalService.updateGoal($event, this.goal.id).subscribe((data: Goal) => {
      this._notificationService.subj_notification.next('Målet har uppdaterats');
      this.back();
     });
  }

  public deleteGoal() {
    this._goalService.deleteGoal(this.goal.id).subscribe((data: any) => {
      this._notificationService.subj_notification.next('Målet har raderats');
      this.back();
    });
  }

  public back() {
    this._location.back();
  }

  public goalAdded() {

  }

  public openDeleteDialog() {
    const dialogRef = this._dialog.open(DeleteGoalDialogComponent, {
      data: { goalName: this.goal.name, userName: this.user.user_detail.full_name },
      maxWidth: '700px',
      minWidth: '700px',
    });
    const sub: Subscription = dialogRef.componentInstance.reflectGoalTemplate.subscribe(
      (data: any) => this.deleteGoal());
    dialogRef.afterClosed().subscribe((result: Goal) => {
      sub.unsubscribe();
    });
  }

}
