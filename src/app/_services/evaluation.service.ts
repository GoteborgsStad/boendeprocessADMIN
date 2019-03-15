import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class EvaluationService {

  constructor(
    private apiService: ApiService,
  ) { }

  public getEvaluationAnswers(id: number) {
    return this.apiService.API('GET', '/v1/cu/evaluations/' + id + '/evaluationanswers');
  }
}
