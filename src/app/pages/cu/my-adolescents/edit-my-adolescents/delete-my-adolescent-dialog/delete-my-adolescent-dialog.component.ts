import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../../../../_models/user/user.model';

@Component({
  selector: 'app-delete-my-adolescent-dialog',
  templateUrl: './delete-my-adolescent-dialog.component.html',
})
export class DeleteMyAdolescentDialogComponent implements OnInit {

  @Output() public reflectGoalTemplate: EventEmitter<{user: User}> =
    new EventEmitter<{user: User}>();
  public user: User;
  public confirmForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<DeleteMyAdolescentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
                this.user = data.user;
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
    this.reflectGoalTemplate.emit({ user: this.user});
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

}
