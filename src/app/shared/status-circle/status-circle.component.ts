import { Component, Input, OnInit } from '@angular/core';
import * as Moment from 'moment-timezone';
import { StatusKey } from '../../_models/user/status-key.enum';
import { User } from '../../_models/user/user.model';
import { Evaluation } from './../../_models/evaluation/evaluation.model';

@Component({
  selector: 'app-status-circle',
  templateUrl: './status-circle.component.html',
})
export class StatusCircleComponent implements OnInit {
  @Input() public user: User;
  public blueCircle: boolean = true;
  public goldCircle: boolean = false;
  public redCircle: boolean = false;
  public showExclamation: boolean = false;
  constructor() { }

  public ngOnInit() {
    this.setStatus();
    this.highlight();
  }

  public setStatus() {
    if (this.user.highest_assignment_status !== null) {
      if (this.user.highest_assignment_status.id === 3 || this.user.highest_assignment_status.id === 4) {
        this.goldCircle = true;
        this.showExclamation = true;
      }
      if (this.user.highest_assignment_status.id === 5) {
        this.redCircle = true;
        this.showExclamation = true;
      }
    }
    /*if(this.user.highest_goal_status !== null) {
      if( this.user.highest_goal_status.id == 3){
      this.goldCircle = true;
      this.showExclamation = true;
    } else if(this.user.highest_goal_status.id == 4){
      this.redCircle = true;
      this.showExclamation = true;
    }
    }*/

  }

  public highlight() {
    if ( this.getStatus(StatusKey.assignment_done) > 0
    || this.getStatus(StatusKey.message_from_adolescent) > 0
    || this.getStatus(StatusKey.message_from_contact) > 0
    || !this.allEvaluationsComplete()
    || !this.user.plan
    || this.user.plan.amount_of_goals === 0
  ) {
      this.showExclamation = true;
    }
  }

  public getStatus(key: StatusKey) {
    if (typeof this.user.global_status.getStatus(key) !== 'undefined') {
    return this.user.global_status.getStatus(key).value;
    } else {
    return 0;
    }
  }

  public evalTimeLeft() {
    // return 2;
    return Moment().endOf('month').diff(Moment().today, 'days');
  }

  public allEvaluationsComplete() {
    let keepLooking = true;
    let complete = true;
    this.user.evaluations.forEach((data: Evaluation) => {
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

/**
 * Nytt= Ett nytt uppdrag som ungdommen ännu inte tittat på (Blå cirkel)
 * I fas= Aktivt uppdrag, det är gott om tid kvar till deadline (när uppdraget
 * inte har någon annan status). (Blå cirkel)
 * Strax deadline= Tre(?) dagar kvar till deadline. (Gul cirkel)
 * Passerad deadline= Deadline för uppdraget har varit och det är inte avklarat (Red cirkel)
 * Inväntar godkännande= Uppdrag som ungdommen har klarat av men som kontktpersonen ännu inte
 * godkänt (Påverkar ramen som blir oragne och att uppdragsikonen lyser upp)
 * Avslutat uppdrag= Uppdrag som ungdommen har klarat av och som är godkända
 */
