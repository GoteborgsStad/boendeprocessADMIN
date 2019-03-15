import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class EvaluationAnswerService {

  constructor(
    private apiService: ApiService,
  ) { }

  public postEvaluationAnswers(values: object) {
    return this.apiService.API('POST', '/v1/cu/evaluationanswers', values);
  }
}
