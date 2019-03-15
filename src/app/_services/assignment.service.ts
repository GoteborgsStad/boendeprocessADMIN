import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class AssignmentService {

  constructor(
    private apiService: ApiService,
  ) { }

  public getAssignment(id: number) {
    return this.apiService.API('GET', '/v1/cu/assignments/' + id);
  }

  public assignmentFinished(id: number) {
    return this.apiService.API('GET', '/v1/cu/assignments/' + id + '/finished');
  }

  public assignmentDeclined(id: number) {
    return this.apiService.API('GET', '/v1/cu/assignments/' + id + '/declined');
  }

  public postAssignment(value: object) {
    return this.apiService.API('POST', '/v1/cu/assignments', value);
  }

  public updateAssignment(id: number, value: object) {
    return this.apiService.API('PATCH', '/v1/cu/assignments/' + id, value);
  }

  public deleteAssignment(id: number) {
    return this.apiService.API('DELETE', '/v1/cu/assignments/' + id);
  }

  public getAssignmentTemplates() {
    return this.apiService.API('GET', '/v1/cu/assignmenttemplates');
  }
}
