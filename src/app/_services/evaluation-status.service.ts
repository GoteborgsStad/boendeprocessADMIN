import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class EvaluationStatusService {

  constructor(
    private apiService: ApiService,
  ) { }

  public getEvaluationStatuses() {
    return this.apiService.API('GET', '/v1/cu/evaluationstatuses');
  }
}
