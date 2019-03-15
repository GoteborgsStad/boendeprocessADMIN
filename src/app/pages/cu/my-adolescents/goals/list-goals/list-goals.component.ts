import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { GoalCategory } from '../../../../../_models/goal/goal-category.model';
import { GoalStatus } from '../../../../../_models/goal/goal-status.model';
import { Goal } from '../../../../../_models/goal/goal.model';
import { Plan } from '../../../../../_models/plan/plan.model';
import { User } from '../../../../../_models/user/user.model';
import { GoalStatusService } from '../../../../../_services/goal-status.service';
import { UserService } from '../../../../../_services/user.service';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
})
export class ListGoalsComponent implements OnInit {

  public user: User;
  public goals: Goal[] = [];
  public goalsComplete: number = 0;
  public goalCategories: GoalCategory[] = [];
  public goalStatuses: GoalStatus[] = [];
  public statusKey: string = 'goal_status';
  public status: string = 'Alla';
  public length: number = 0;
  public pageSize: number = 3;
  public pageSizeOption: number[] = [3, 6, 12, 24];
  public pageEvent: PageEvent = new PageEvent();
  constructor(public fb: FormBuilder,
              private _userService: UserService,
              private _paginatorIntl: MatPaginatorIntl,
              private _route: ActivatedRoute,
              private _goalStatusService: GoalStatusService) { }

  public ngOnInit() {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 3;

    this._paginatorIntl.nextPageLabel = 'Nästa';
    this._paginatorIntl.previousPageLabel = 'Föregående';
    this._paginatorIntl.itemsPerPageLabel = 'Uppdrag per sida:';

    const id = +this._route.snapshot.paramMap.get('id');

    this._userService.getUserById(id).subscribe((data: User) => this.user = data);

    this._userService.getPlans(id).subscribe(
      (data: Plan) => {
          this.goals = data.goals;
          this.pageEvent.length = this.goals.length;
          this.length = this.goals.length;
        },
      );

    this._goalStatusService.getGoalStatuses().subscribe((data: GoalStatus[]) => this.goalStatuses = data);
  }

  public statusChange(status: string) {
    let count = 0;

    if (status === 'Alla') {
      this.pageEvent.length = this.goals.length;
      this.length = this.goals.length;

      return;
    }

    for (const data of this.goals) {
      if (data.goal_status.name === status) {
        count++;
      }
    }

    this.pageEvent.length = count;
    this.length = count;
  }

}
