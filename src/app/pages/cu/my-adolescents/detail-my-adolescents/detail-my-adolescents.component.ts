import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusKey } from '../../../../_models/user/status-key.enum';
import { User } from '../../../../_models/user/user.model';
import { SharingService } from '../../../../_services/sharing.service';
import { UserService } from '../../../../_services/user.service';

import * as Moment from 'moment-timezone';

@Component({
  selector: 'app-detail-my-adolescents',
  templateUrl: 'detail-my-adolescents.component.html',
})

export class DetailMyAdolescentsComponent implements OnInit {
  public adolescent: User = null;
  public globalStatusUser: User = null;
  public statusKey = StatusKey;
  public overall_assignment_status: string = '';
  public assignment_status: number = 0;

  constructor(
    public sharingService: SharingService,
    private _userService: UserService,
    private _router: Router,
    public route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this._userService.getUserById(id)
      .subscribe((user: User) => {
        this.adolescent = user;
        this.setOverallAssignmentStatus();
      },
    );
    this.globalStatusUser = this.sharingService.getData();
    // (this.globalStatusUser);
  }
  public sendToEdit() {
    this.adolescent.global_status = this.globalStatusUser.global_status;
    this.sharingService.setData(this.adolescent);
    this._router.navigate(['/cu/minaungdomar/' + this.adolescent.id + '/edit']);
  }
  public passToEvaluation(adolescent: User) {
    this.sharingService.setData(adolescent);
    this._router.navigate(['/cu/minaungdomar/' + adolescent.id + '/evaluations']);
  }

  public getStatus(key: StatusKey) {
   // console.log(this.globalStatusUser);
    if (typeof this.globalStatusUser.global_status.getStatus(key) !== 'undefined') {
    return this.globalStatusUser.global_status.getStatus(key).value;
    } else {
    return 0;
    }
  }

  public timeForEval() {
    return Moment().endOf('month').diff(Moment().today, 'days') < 4;
  }

  public evalTimeLeft() {
    // return 2;
    return Moment().endOf('month').diff(Moment().today, 'days');
  }

  public setOverallAssignmentStatus() {
    if (this.adolescent.highest_assignment_status !== null) {
      if (this.adolescent.highest_assignment_status.id === 3 || this.adolescent.highest_assignment_status.id === 4) {
        this.overall_assignment_status = 'En uppgift närmar sig slutdatum';
        this.assignment_status = 1;
      } else if (this.adolescent.highest_assignment_status.id === 5) {
        this.overall_assignment_status = 'Slutdatum för en uppgift har passerat';
        this.assignment_status = 3;
      } else {
        this.overall_assignment_status = 'Alla uppdrag ligger i fas';
      }
    }
  }

}
