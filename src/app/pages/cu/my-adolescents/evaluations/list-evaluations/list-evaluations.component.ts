import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { EvaluationStatusService } from '../../../../../_services/evaluation-status.service';
import { UserService } from '../../../../../_services/user.service';

import { EvaluationStatus } from '../../../../../_models/evaluation/evaluation-status.model';
import { Evaluation } from '../../../../../_models/evaluation/evaluation.model';
import { User } from '../../../../../_models/user/user.model';

@Component({
  selector: 'app-list-evaluations',
  templateUrl: 'list-evaluations.component.html',
})

export class ListEvaluationsComponent implements OnInit {
  public evaluations: Evaluation[];
  public evaluationStatuses: EvaluationStatus[];
  public adolescent: User;
  public daysLeft: number = 0;
  public statusKey: string = 'evaluation_status';
  public status: string = 'Alla';
  public length: number = 0;
  public pageSize: number = 3;
  public pageSizeOption: number[] = [3, 6, 12, 24];
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _route: ActivatedRoute,
    private _paginatorIntl: MatPaginatorIntl,
    private _userService: UserService,
    private _evaluationStatusService: EvaluationStatusService,
  ) { }

  public ngOnInit() {
    this.daysLeft = moment().endOf('month').diff(moment(), 'days');

    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 3;

    this._paginatorIntl.nextPageLabel = 'Nästa';
    this._paginatorIntl.previousPageLabel = 'Föregående';
    this._paginatorIntl.itemsPerPageLabel = 'Uppdrag per sida:';

    this._route.params.subscribe(
      (parameters) => {
        this._userService.getUser(parameters.id).subscribe(
          (res) => {
            this.adolescent = res;
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );

        this._userService.getEvaluations(parameters.id).subscribe(
          (res) => {
            this.evaluations = res;

            this.pageEvent.length = this.evaluations.length;
            this.length = this.evaluations.length;
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );
      },
    );

    this._evaluationStatusService.getEvaluationStatuses().subscribe(
      (res) => {
        this.evaluationStatuses = res;
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }

  public statusChange(status) {
    let count = 0;

    if (status === 'Alla') {
      this.pageEvent.length = this.evaluations.length;
      this.length = this.evaluations.length;

      return;
    }

    for (const data of this.evaluations) {
      if (data.evaluation_status.name === status) {
        count++;
      }
    }

    this.pageEvent.length = count;
    this.length = count;
  }
}
