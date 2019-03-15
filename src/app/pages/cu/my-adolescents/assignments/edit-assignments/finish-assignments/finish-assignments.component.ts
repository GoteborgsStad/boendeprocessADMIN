import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Assignment } from '../../../../../../_models/assignment/assignment.model';

import { FinishAssignmentsDialogComponent } from '../finish-assignments-dialog/finish-assignments-dialog.component';

@Component({
  selector: 'app-finish-assignments',
  templateUrl: 'finish-assignments.component.html',
})

export class FinishAssignmentsComponent implements OnInit {
  @Input() public assignment: Assignment;
  @Input() public assignmentId: number;

  constructor(
    private _dialog: MatDialog,
  ) { }

  public ngOnInit() { }

  public openFinishAssignmentDialog() {
    const dialogRef = this._dialog.open(FinishAssignmentsDialogComponent, {
      maxWidth: '700px',
      minWidth: '700px',
    });

    dialogRef.componentInstance.assignmentId = this.assignmentId;
    dialogRef.componentInstance.assignment = this.assignment;
  }
}
