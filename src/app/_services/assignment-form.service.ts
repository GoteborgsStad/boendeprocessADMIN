import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AssignmentFormService {

  constructor(
    private apiService: ApiService,
  ) { }

  public getAssignmentForms() {
    return this.apiService.API('GET', '/v1/cu/assignmentforms');
  }
}
