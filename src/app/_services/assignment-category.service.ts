import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AssignmentCategoryService {

  constructor(
    private apiService: ApiService,
  ) { }

  public getAssignmentCategories() {
    return this.apiService.API('GET', '/v1/cu/assignmentcategories');
  }
}
