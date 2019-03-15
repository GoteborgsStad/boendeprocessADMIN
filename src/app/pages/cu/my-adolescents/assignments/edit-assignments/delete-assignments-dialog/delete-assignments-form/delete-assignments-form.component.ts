import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { AssignmentService } from '../../../../../../../_services/assignment.service';

@Component({
  selector: 'app-delete-assignments-form',
  templateUrl: 'delete-assignments-form.component.html',
})

export class DeleteAssignmentsFormComponent implements OnInit {
  @Input() public assignmentId: number;
  public deleteAssignmentsForm: FormGroup;

  // tslint:disable-next-line
  private submitted: boolean = false;

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteAssignmentsFormComponent>,
    private _assignmentService: AssignmentService,
  ) { }

  public ngOnInit() {
    this.deleteAssignmentsForm = this._formBuilder.group({ });
  }

  public deleteAssignments({ value, valid }) {
    this.submitted = true;

    if (!valid) {
      this._snackbar.open('Något gick tyvärr fel, försök igen senare.', undefined, {
        duration: 5000,
        extraClasses: ['bg-aska'],
      });

      return;
    }

    this._assignmentService.deleteAssignment(this.assignmentId).subscribe(
      (res) => {
        this._snackbar.open('Uppdraget har nu tagits bort!', undefined, {
          duration: 5000,
          extraClasses: ['bg-arta'],
        });

        this.dialogRef.close();

        this._location.back();
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
