import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { AssignmentService } from '../../../../../../../_services/assignment.service';

import { Assignment } from '../../../../../../../_models/assignment/assignment.model';

@Component({
  selector: 'app-finish-assignments-form',
  templateUrl: 'finish-assignments-form.component.html',
})

export class FinishAssignmentsFormComponent implements OnInit {
  @Input() public assignment: Assignment;
  @Input() public assignmentId: number;
  public finishAssignmentsForm: FormGroup;

  // tslint:disable-next-line
  private submitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<FinishAssignmentsFormComponent>,
    private _assignmentService: AssignmentService,
  ) { }

  public ngOnInit() {
    this.finishAssignmentsForm = this._formBuilder.group({ });
  }

  public finishAssignments({ value, valid }) {
    this.submitted = true;

    if (!valid) {
      this._snackbar.open('Något gick tyvärr fel, försök igen senare.', undefined, {
        duration: 5000,
        extraClasses: ['bg-aska'],
      });

      return;
    }

    this._assignmentService.assignmentFinished(this.assignmentId).subscribe(
      (res) => {
        this._snackbar.open('Uppdraget har nu slutförts!', undefined, {
          duration: 5000,
          extraClasses: ['bg-arta'],
        });

        this.assignment.finished_at = res.finished_at;

        this.dialogRef.close();
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
