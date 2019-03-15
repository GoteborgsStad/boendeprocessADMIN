import { Component, OnInit } from '@angular/core';

import { Assignment } from '../../../../../../_models/assignment/assignment.model';

@Component({
  selector: 'app-finish-assignments-dialog',
  templateUrl: 'finish-assignments-dialog.component.html',
})

export class FinishAssignmentsDialogComponent implements OnInit {
  public assignment: Assignment;
  public assignmentId: number;

  constructor() { }

  public ngOnInit() { }
}
