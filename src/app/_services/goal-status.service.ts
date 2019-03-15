import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class GoalStatusService {

  constructor(private _apiService: ApiService) { }

  public getGoalStatuses() {
    return this._apiService.API('GET', '/v1/cu/goalstatuses');
  }

}
