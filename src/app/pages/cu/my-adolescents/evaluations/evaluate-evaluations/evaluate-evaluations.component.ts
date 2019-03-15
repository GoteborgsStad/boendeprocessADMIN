import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Goal } from './../../../../../_models/goal/goal.model';

import { EvaluationAnswerService } from '../../../../../_services/evaluation-answer.service';
import { EvaluationService } from '../../../../../_services/evaluation.service';
import { GoalService } from '../../../../../_services/goal.service';
import { UserService } from '../../../../../_services/user.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Subscription } from 'rxjs/Subscription';
import { Plan } from '../../../../../_models/plan/plan.model';
import { User } from '../../../../../_models/user/user.model';
import { NotificationService } from '../../../../../_services/notification.service';
import { ConfirmEvaluateDialogComponent } from './confirm-evaluate-dialog/confirm-evaluate-dialog.component';
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
  selector: 'app-evaluate-evaluations',
  templateUrl: 'evaluate-evaluations.component.html',
})

export class EvaluateEvaluationsComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') public stepper: MatStepper;
  public plan: Plan;
  public adolescent: User;
  public evaluationId: number;
  public isLinear = false;
  public addEvaluationAnswersForm: FormGroup;
  public updateGoalsForm: FormGroup;
  public subscription: Subscription;
  public minDate: Date = new Date();

  public stepsOne: any[] = [
    {
      description: '',
      name: 'Boende',
      ratings: [
        { imageName: 'smile_1.png', value: 1, highlight: true },
        { imageName: 'smile_2.png', value: 2, highlight: false },
        { imageName: 'smile_3.png', value: 3, highlight: false },
        { imageName: 'smile_4.png', value: 4, highlight: false },
        { imageName: 'smile_5.png', value: 5, highlight: false },
        { imageName: 'smile_6.png', value: 6, highlight: false },
      ],
      selector: 'housing',
    },
    {
      description: '',
      name: 'Delaktighet',
      ratings: [
        { imageName: 'smile_1.png', value: 1, highlight: true },
        { imageName: 'smile_2.png', value: 2, highlight: false },
        { imageName: 'smile_3.png', value: 3, highlight: false },
        { imageName: 'smile_4.png', value: 4, highlight: false },
        { imageName: 'smile_5.png', value: 5, highlight: false },
        { imageName: 'smile_6.png', value: 6, highlight: false },
      ],
      selector: 'participation',
    },
    {
      description: '',
      name: 'Uppdrag',
      ratings: [
        { imageName: 'smile_1.png', value: 1, highlight: true },
        { imageName: 'smile_2.png', value: 2, highlight: false },
        { imageName: 'smile_3.png', value: 3, highlight: false },
        { imageName: 'smile_4.png', value: 4, highlight: false },
        { imageName: 'smile_5.png', value: 5, highlight: false },
        { imageName: 'smile_6.png', value: 6, highlight: false },
      ],
      selector: 'assignment',
    },
  ];

  constructor(
    public location: Location,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _goalService: GoalService,
    private _evaluationService: EvaluationService,
    private _dialog: MatDialog,
    private _evaluationAnswerService: EvaluationAnswerService,
    private _notificationService: NotificationService,
  ) { }

  public ngOnInit() {
    this.addEvaluationAnswersForm = this._formBuilder.group({
      assignment: ['', Validators.required],
      assignmentRating: [1, Validators.required],
      housing: ['', Validators.required],
      housingRating: [1, Validators.required],
      participation: ['', Validators.required],
      participationRating: [1, Validators.required],
    });

    this.updateGoalsForm = this._formBuilder.group({
      endDate: [undefined, Validators.required],
    });

    this._route.parent.params.subscribe(
      (parameters) => {
        this._userService.getUser(parameters.id).subscribe(
          (res) => {
            this.adolescent = res;
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );

        this._userService.getPlan(parameters.id).subscribe(
          (res) => {
            this.plan = res;
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );
      },
    );
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public ngAfterViewInit() {
    this._route.params.subscribe(
      (parameters) => {
        this.evaluationId = parameters.id;

        this._evaluationService.getEvaluationAnswers(this.evaluationId).subscribe(
          (res) => {
            if (res.length === 3) {
              this.stepper.next();
            }

            for (const value of res) {
              this.addEvaluationAnswersForm.get(value.evaluation_answer_category.type).setValue(value.body);
              // tslint:disable-next-line:max-line-length
              this.addEvaluationAnswersForm.get(value.evaluation_answer_category.type + 'Rating').setValue(value.rating);

              for (const stepOne of this.stepsOne) {
                if (stepOne.selector === value.evaluation_answer_category.type) {
                  // tslint:disable-next-line:max-line-length
                  this.checkHighlight(stepOne, {imageName: 'smile_' + value.rating + '.png', value: value.rating, highlight: false});
                }
              }
            }
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );
      },
    );
  }

  public addEvaluationAnswers({ value, valid }) {
    const body     = [value.assignment, value.housing, value.participation];
    const rating   = [value.assignmentRating, value.housingRating, value.participationRating];
    const category = ['housing', 'participation', 'assignment'];

    for (let i = 0; i < body.length; ++i) {
      this._evaluationAnswerService.postEvaluationAnswers({
        body: body[i],
        evaluation_answer_category_type: category[i],
        evaluation_id: this.evaluationId,
        rating: rating[i],
      }).subscribe(
        (res) => {
          // Result
        },
        (err) => {
          // Error
        },
        () => {
          // Done
        },
      );
    }
  }

  public showConfirmDialog(goal: Goal) {
    const dialogRef = this._dialog.open(ConfirmEvaluateDialogComponent, {
      data: { goal },
      maxHeight: '700px',
      width: '700px',
    });

    this.subscription = dialogRef.componentInstance.completeGoalConfirmationEmitter.subscribe(
      (data: { goal: Goal }) => {
        if (data.goal) {
          this.finishGoal(goal);
        }
      });
    this.subscription = dialogRef.afterClosed().subscribe((result: Goal) => {
      this.subscription.unsubscribe();
    });
  }

  public finishGoal(goal: Goal) {
    this._goalService.finishGoal(goal.id).subscribe(
      (res) => {
        this.plan.goals = this.plan.goals.filter( (obj) => obj.id !== res.id );
        this._notificationService.subj_notification.next('Målet har slutförs.');
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }

  public updateEndDate(goal: Goal) {
    this._goalService.updateEndDateGoal({
      end_at: goal.end_at,
    }, goal.id).subscribe(
      (res) => {
        this._notificationService.subj_notification.next('Slutdatum har uppdaterats!');
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }

  public checkHighlight(stepOne: any, rating: any) {
    for (const step of this.stepsOne) {
      if (step.name === stepOne.name) {
        for (const rate of step.ratings) {
          if (rate.imageName !== rating.imageName) {
            rate.highlight = false;
          } else {
            this.addEvaluationAnswersForm.get(step.selector + 'Rating').setValue(rate.value);
            rate.highlight = true;
          }
        }
      }
    }
  }
}
