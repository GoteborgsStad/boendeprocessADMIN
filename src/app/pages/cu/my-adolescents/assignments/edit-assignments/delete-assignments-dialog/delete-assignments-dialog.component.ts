import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-assignments-dialog',
  templateUrl: 'delete-assignments-dialog.component.html',
})

export class DeleteAssignmentsDialogComponent implements OnInit {
  public assignmentId: number;

  constructor() { }

  public ngOnInit() { }
}
