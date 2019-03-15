import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { default as _rollupMoment } from 'moment-timezone';
import * as _moment from 'moment-timezone';
import 'rxjs/add/observable/forkJoin';
import { Subscription } from 'rxjs/Subscription';
import { GoalCategory } from '../../../../../../_models/goal/goal-category.model';
import { GoalForm } from '../../../../../../_models/goal/goal-form.model';
import { Goal } from '../../../../../../_models/goal/goal.model';
import { User } from '../../../../../../_models/user/user.model';
import { GoalService } from '../../../../../../_services/goal.service';
import { GoalTemplateDialogComponent } from '../../goal-template-dialog/goal-template-dialog.component';
const moment = _rollupMoment || _moment;

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
  selector: 'app-edit-goal-form',
  templateUrl: './edit-goal-form.component.html',
})
export class EditGoalFormComponent implements OnInit, OnDestroy {

  @Input() public user: User;
  @Input() public goal: Goal;
  @Output() public editGoalEmitter = new EventEmitter<any>();
  @Output() public abortEdit = new EventEmitter<any>();
  public goalsForm: FormGroup;
  public goalCategories: GoalCategory[] = [];
  public subscription: Subscription = null;
  public minDate: Date = new Date();
  constructor(public fb: FormBuilder,
              private _dialog: MatDialog,
              private _goalService: GoalService) {
  }

  public ngOnInit() {
    this._goalService.getGoalCategories().subscribe((data: GoalCategory[]) => {
      this.goalCategories = data;
    });
    this.buildForm();
  }

  public ngOnDestroy() {
    if (this.subscription !== null && typeof this.subscription !== 'undefined') {
      this.subscription.unsubscribe();
    }
  }

  public buildForm() {
    this.goalsForm = this.fb.group({
      description: new FormControl(this.goal.description),
      end_at: new FormControl(moment(this.goal.end_at), [Validators.required]),
      goal_category_id: new FormControl(this.goal.goal_category.id, [Validators.required]),
      name: new FormControl(this.goal.name, [Validators.required]),
    });
  }

  public removeGoal() { }

  public submitGoals() {
    if (this.goalsForm.valid) {
      const goal: GoalForm = {
        description: this.goalsForm.controls.description.value,
        end_at: moment(this.goalsForm.controls.end_at.value)
          .tz('Europe/Stockholm').format('YYYY-MM-DD hh:mm:ss'),
        goal_category_id: this.goalsForm.controls.goal_category_id.value,
        goal_status_id: 0,
        name: this.goalsForm.controls.name.value,
        user_id: this.user.id,
      };
      this.editGoalEmitter.emit(goal);
    }
  }

  public updateGoalEntry(data: { position: number, goal: Goal }) {
    const goalControls = this.goalsForm;
    goalControls.get('name').setValue(data.goal.name);
    goalControls.get('end_at').setValue(data.goal.end_at);
    goalControls.get('goal_category_id').setValue(data.goal.goal_category.id);
    goalControls.get('description').setValue(data.goal.description);
  }

  public setGoalId(goal: Goal) {

  }

  public isDateValid() {
    const goals = this.goalsForm.controls.value as FormControl;
    return goals.status === 'VALID';
  }

  public abort() {
    this.abortEdit.emit();
  }

  public openTemplateDialog(i: number = 1): void {
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

}
