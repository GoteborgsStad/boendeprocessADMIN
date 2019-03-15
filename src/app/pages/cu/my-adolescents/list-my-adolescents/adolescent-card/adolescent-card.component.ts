import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusKey } from './../../../../../_models/user/status-key.enum';

import { User } from '../../../../../_models/user/user.model';

import * as Moment from 'moment-timezone';
import { Evaluation } from '../../../../../_models/evaluation/evaluation.model';
import { SharingService } from '../../../../../_services/sharing.service';

@Component({
  selector: 'app-adolescent-card',
  templateUrl: './adolescent-card.component.html',
})
export class AdolescentCardComponent implements OnInit {
  @Input() public adolescent: User;
  public statusKey = StatusKey;

  constructor(
    public sharingService: SharingService,
    private _router: Router,
  ) { }

  public ngOnInit() {
  }

  public getStatus(key: StatusKey) {
    if (typeof this.adolescent.global_status.getStatus(key) !== 'undefined') {
    return this.adolescent.global_status.getStatus(key).value;
    } else {
    return 0;
    }
  }

  public highlight() {
    return this.getStatus(StatusKey.assignment_done) > 0 ||
    this.getStatus(StatusKey.message_from_adolescent) > 0 ||
    this.getStatus(StatusKey.message_from_contact) > 0 ||
    !this.allEvaluationsComplete() ||
    !this.adolescent.plan || this.adolescent.plan.amount_of_goals === 0;
  }

  public evalTimeLeft() {
    // return 2;
    return Moment().endOf('month').diff(Moment().today, 'days');
  }

  public passToSingle(adolescent: User) {
    this.sharingService.setData(adolescent);
    this._router.navigate(['/cu/minaungdomar/' + adolescent.id + '/detail']);
  }

  public passToChat(adolescent: User) {
    this.sharingService.setData(adolescent);
    this._router.navigate(['/cu/minaungdomar/' + adolescent.id + '/chat']);
  }

  public passToAssignments(adolescent: User) {
    this.sharingService.setData(adolescent);
    this._router.navigate(['/cu/minaungdomar/' + adolescent.id + '/assignments']);
  }
  public passToGoals(adolescent: User) {
    this.sharingService.setData(adolescent);
  }

  public passToEvaluation(adolescent: User) {
    this.sharingService.setData(adolescent);
    this._router.navigate(['/cu/minaungdomar/' + adolescent.id + '/evaluations']);
  }

  public allEvaluationsComplete() {
    let keepLooking = true;
    let complete = true;
    this.adolescent.evaluations.forEach((data: Evaluation) => {
      if (keepLooking === true) {
        complete = data.evaluation_status.name === 'Genomförda';
        if (complete === false) {
          keepLooking = false;
        }
      }

    });
    return complete;
  }
}
