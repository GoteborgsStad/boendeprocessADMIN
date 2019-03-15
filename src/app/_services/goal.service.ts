import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGoal } from '../_models/goal/api-goal.model';
import { GoalForm } from '../_models/goal/goal-form.model';
import { GoalTemplate } from '../_models/goal/goal-template.model';
import { Goal } from '../_models/goal/goal.model';
import { GoalCategory } from './../_models/goal/goal-category.model';
import { ApiService } from './api.service';

@Injectable()
export class GoalService {

  constructor(public apiService: ApiService) { }

  public getGoalTemplates(): Observable<GoalTemplate[]> {
    return this.apiService.API('GET', '/v1/cu/goaltemplates').map((data: GoalTemplate[]) => {
      const goalTemplates: GoalTemplate[] = [];
      data.forEach((goalTemplate: GoalTemplate) => {
        goalTemplates.push(new GoalTemplate(goalTemplate));
      });
      return goalTemplates;
    });
  }

  public getGoalCategories(): Observable<GoalCategory[]> {
    return this.apiService.API('GET', '/v1/cu/goalcategories').map((data: GoalCategory[]) => data);
  }

  public getGoal(id: number): Observable<Goal> {
    return this.apiService.API('GET', '/v1/cu/goals/' + id).map((data: Goal) => new Goal(data));
  }

  public saveGoal(goal: ApiGoal): Observable<Goal> {
    return this.apiService.API('POST', '/v1/cu/goals', goal).map((data: Goal) => {
      return new Goal(data);
    });
  }

  public finishGoal(id: number) {
    return this.apiService.API('GET', '/v1/cu/goals/' + id + '/finished');
  }

  public declineGoal(id: number) {
    return this.apiService.API('GET', '/v1/cu/goals/' + id + '/declined');
  }

  public updateGoal(goal: GoalForm, id: number) {
    return this.apiService.API('PATCH', '/v1/cu/goals/' + id, goal);
  }

  public deleteGoal(id: number) {
    return this.apiService.API('DELETE', '/v1/cu/goals/' + id);

  }

  public updateEndDateGoal(values: object, id: number) {
    return this.apiService.API('PATCH', '/v1/cu/goals/' + id + '/updateenddate', values);
  }
}
