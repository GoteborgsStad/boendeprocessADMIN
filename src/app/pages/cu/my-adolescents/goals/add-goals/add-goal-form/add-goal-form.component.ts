import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ApiGoal } from '../../../../../../_models/goal/api-goal.model';
import { Goal } from '../../../../../../_models/goal/goal.model';
import { User } from '../../../../../../_models/user/user.model';
import { GoalCategory } from './../../../../../../_models/goal/goal-category.model';

import { GoalService } from '../../../../../../_services/goal.service';
import { NotificationService } from '../../../../../../_services/notification.service';

import { GoalTemplateDialogComponent } from '../../goal-template-dialog/goal-template-dialog.component';

export const MY_FORMATS = {
  display: {
    dateA11yLabel: 'LL',
    dateInput: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
  },
  parse: {
    dateInput: 'LL',
  },
};

@Component({
  providers: [{
    deps: [MAT_DATE_LOCALE],
    provide: DateAdapter,
    useClass: MomentDateAdapter,
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  selector: 'app-add-goal-form',
  templateUrl: './add-goal-form.component.html',
})
export class AddGoalFormComponent implements OnInit, OnDestroy {
  @Input() public user: User;
  @Output() public addGoalEmitter: EventEmitter<any> = new EventEmitter<any>();
  public goalsForm: FormGroup;
  public goals: FormArray = new FormArray([]);
  public goalCategories: GoalCategory[] = [];
  public subscription: Subscription = null;
  public minDate: Date = new Date();

  constructor(
    public fb: FormBuilder,
    private _dialog: MatDialog,
    private _goalService: GoalService,
    private _notificationService: NotificationService,
    public location: Location,
  ) {
    this.buildForm();
  }

  public ngOnInit() {
    this._goalService.getGoalCategories().subscribe((data: GoalCategory[]) => this.goalCategories = data);
  }

  public ngOnDestroy() {
    if (this.subscription !== null && typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
  }

  public buildForm() {
    this.goals.push(this.fb.group({
      description: ['', Validators.required],
      end_at: [null, Validators.required],
      goal_category_id: [null, Validators.required],
      name: ['', Validators.required],
    }));
    this.goalsForm = this.fb.group({
      goals: this.goals,
    });
  }

  public addGoal() {
    this.goals = this.goalsForm.get('goals') as FormArray;
    this.goals.push(this.fb.group({
      description: ['', Validators.required],
      end_at: [null, Validators.required],
      goal_category_id: [null, Validators.required],
      name: ['', Validators.required],
    }));
  }

  public removeGoal() { }

  public submitGoals() {
    const goals = this.goalsForm.controls.goals as FormArray;
    const goalControls = goals.value;
    const goalObservables: Array<Observable<Goal>> = [];
    goalControls.forEach((goal: ApiGoal) => {
      const apiGoal: ApiGoal = new ApiGoal(goal);
      apiGoal.user_id = this.user.id;
      goalObservables.push(this._goalService.saveGoal(apiGoal));
    });
    Observable.forkJoin(goalObservables).subscribe((data: Goal[]) => {
      this._notificationService.subj_notification.next('Nytt mål upplagt');
      this.location.back();
    },
      (error: Error) => {
        this._notificationService.error_notification.next('Ett fel har inträffat');
      });
  }

  public openDialog(i: number): void {
    const dialogRef = this._dialog.open(GoalTemplateDialogComponent, {
      data: { position: i, categories: this.goalCategories },
      maxWidth: '700px',
      minWidth: '700px',
    });
    const sub: Subscription = dialogRef.componentInstance.reflectGoalTemplate.subscribe(
      (data: { position: number, goal: Goal }) => {
        if (data.goal) {
          this.updateGoalEntry(data);
        }
      });
    this.subscription = dialogRef.afterClosed().subscribe((result: Goal) => {
      sub.unsubscribe();
    });

  }

  public updateGoalEntry(data: { position: number, goal: Goal }) {
    const goals = this.goalsForm.controls.goals as FormArray;
    const goalControls = goals.controls[data.position] as FormControl;
    goalControls.get('name').setValue(data.goal.name);
    goalControls.get('goal_category_id').setValue(data.goal.goal_category.id);
    goalControls.get('description').setValue(data.goal.description);
  }

  public isDateValid(i: number) {
    const goals = this.goalsForm.controls.goals as FormArray;
    const goalControls = goals.controls[i] as FormControl;
    return goalControls.status === 'VALID';
  }

}
