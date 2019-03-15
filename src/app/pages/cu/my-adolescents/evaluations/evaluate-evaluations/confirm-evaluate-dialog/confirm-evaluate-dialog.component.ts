import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Goal } from './../../../../../../_models/goal/goal.model';

@Component({
  selector: 'app-confirm-evaluate-dialog',
  templateUrl: './confirm-evaluate-dialog.component.html',
})
export class ConfirmEvaluateDialogComponent implements OnInit {
  @Output() public completeGoalConfirmationEmitter: EventEmitter<any> = new EventEmitter<any>();
  public goal: Goal;

  constructor(public dialogRef: MatDialogRef<ConfirmEvaluateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.goal = data.goal;
  }

  public ngOnInit() {
  }

  public confirmSubmission() {
    this.completeGoalConfirmationEmitter.emit({goal: this.goal});
    this.dialogRef.close();
  }
}
