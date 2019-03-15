import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatSnackBar, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AssignmentStatusService } from '../../../../../_services/assignment-status.service';
import { AssignmentService } from '../../../../../_services/assignment.service';
import { UserService } from '../../../../../_services/user.service';

import { AssignmentStatus } from '../../../../../_models/assignment/assignment-status.model';
import { Assignment } from '../../../../../_models/assignment/assignment.model';
import { User } from '../../../../../_models/user/user.model';

@Component({
  selector: 'app-list-assignments',
  templateUrl: 'list-assignments.component.html',
})

export class ListAssignmentsComponent implements OnInit {
  public assignments: Assignment[] = [];
  public assignmentStatuses: AssignmentStatus[] = [];
  public adolescent: User;
  public userId: number;
  public statusKey: string = 'assignment_status';
  public status: string = 'Alla';
  public length: number = 0;
  public pageSize: number = 3;
  public pageSizeOption: number[] = [3, 6, 12, 24];

  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    private _paginatorIntl: MatPaginatorIntl,
    private _userService: UserService,
    private _assignmentService: AssignmentService,
    private _assignmentStatusService: AssignmentStatusService,
  ) { }

  public ngOnInit() {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 3;

    this._paginatorIntl.nextPageLabel = 'Nästa';
    this._paginatorIntl.previousPageLabel = 'Föregående';
    this._paginatorIntl.itemsPerPageLabel = 'Uppdrag per sida:';

    this._assignmentStatusService.getAssignmentStatuses().subscribe(
      (res) => {
        this.assignmentStatuses = res;
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );

    this._route.params.subscribe(
      (parameters) => {
        this.userId = parameters.id;

        this._userService.getAssignments(this.userId).subscribe(
          (res) => {
            this.assignments = res;

            this.pageEvent.length = this.assignments.length;
            this.length = this.assignments.length;
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );

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
      },
    );
  }

  public statusChange(status) {
    let count = 0;

    if (status === 'Alla') {
      this.pageEvent.length = this.assignments.length;
      this.length = this.assignments.length;

      return;
    }

    for (const data of this.assignments) {
      if (data.assignment_status.name === status) {
        count++;
      }
    }

    this.pageEvent.length = count;
    this.length = count;
  }

  public showMore(assignment: Assignment) {
    if (document.getElementById('text-' + assignment.id).classList.contains('truncate')) {
      document.getElementById('big-card-' + assignment.id).classList.remove('height-150');
      document.getElementById('text-' + assignment.id).classList.remove('truncate');

      if (document.getElementById('extra-' + assignment.id) !== null) {
        document.getElementById('extra-' + assignment.id).classList.remove('dn');
      }

      assignment.is_toggled = true;
    } else {
      document.getElementById('big-card-' + assignment.id).classList.add('height-150');
      document.getElementById('text-' + assignment.id).classList.add('truncate');

      if (document.getElementById('extra-' + assignment.id) !== null) {
        document.getElementById('extra-' + assignment.id).classList.add('dn');
      }

      assignment.is_toggled = false;
    }
  }

  public assignmentAccepted(assignmentId: number) {
    this._assignmentService.assignmentFinished(assignmentId).subscribe(
      (res) => {
        for (const assignment of this.assignments) {
          if (assignment.id === res.id) {
            assignment.finished_at = res.finished_at;

            this._snackbar.open('Uppdraget är nu avslutat!', undefined, {
              duration: 5000,
              extraClasses: ['bg-arta'],
            });

            break;
          }
        }
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }

  public assignmentDeclined(assignmentId: number) {
    this._assignmentService.assignmentDeclined(assignmentId).subscribe(
      (res) => {
        for (const assignment of this.assignments) {
          if (assignment.id === res.id) {
            assignment.accepted_at = res.accepted_at;

            this._snackbar.open('Uppdraget har returnerats.', undefined, {
              duration: 5000,
              extraClasses: ['bg-aska'],
            });

            break;
          }
        }
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }
}
