import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DeleteAssignmentsDialogComponent } from '../delete-assignments-dialog/delete-assignments-dialog.component';

@Component({
  selector: 'app-delete-assignments',
  templateUrl: 'delete-assignments.component.html',
})

export class DeleteAssignmentsComponent implements OnInit {
  @Input() public assignmentId: number;

  constructor(
    private _dialog: MatDialog,
  ) { }

  public ngOnInit() { }

  public openDeleteAssignmentsDialog() {
    const dialogRef = this._dialog.open(DeleteAssignmentsDialogComponent, {
      maxWidth: '700px',
      minWidth: '700px',
    });

    dialogRef.componentInstance.assignmentId = this.assignmentId;
  }
}
