import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AssignmentStatusService {

  constructor(
    private apiService: ApiService,
  ) { }

  public getAssignmentStatuses() {
    return this.apiService.API('GET', '/v1/cu/assignmentstatuses');
  }
}
