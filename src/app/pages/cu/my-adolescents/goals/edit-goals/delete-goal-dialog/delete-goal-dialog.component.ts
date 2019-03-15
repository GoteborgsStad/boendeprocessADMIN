import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-goal-dialog',
  templateUrl: './delete-goal-dialog.component.html',
})
export class DeleteGoalDialogComponent implements OnInit {
  @Output() public reflectGoalTemplate: EventEmitter<any> =
    new EventEmitter<any>();
  public position;
  public goalName: string;
  public userName: string;
  public confirmForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DeleteGoalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) {
    this.goalName = data.goalName;
    this.userName = data.userName;
    this.buildForm();
  }

  public ngOnInit() {

  }

  public buildForm() {
    this.confirmForm = this.fb.group({
      confirm: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  public abort() {
    this.close();
  }

  public apply() {
    this.reflectGoalTemplate.emit();
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

}
