import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../../../../../_services/user.service';

@Component({
  selector: 'app-delete-me-form',
  templateUrl: 'delete-me-form.component.html',
})

export class DeleteMeFormComponent implements OnInit {
  public deleteMeForm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteMeFormComponent>,
    private _userService: UserService,
  ) { }

  public ngOnInit() {
    this.deleteMeForm = this._formBuilder.group({
      confirmed: ['', Validators.required],
    });
  }

  public deleteMe({ value, valid }) {
    if (!value.confirmed) {
      this._snackbar.open('Du måste först godkänna borttagningen.', undefined, {
        duration: 5000,
        extraClasses: ['bg-aska'],
      });

      return;
    }

    this._userService.deleteMe().subscribe(
      (res) => {
        this._snackbar.open('Din användare har nu tagits bort!', undefined, {
          duration: 5000,
          extraClasses: ['bg-arta'],
        });

        this.dialogRef.close();

        this._router.navigate(['/']);
      },
      (err) => {
        this._snackbar.open('Något gick tyvärr fel, försök igen senare.', undefined, {
          duration: 5000,
          extraClasses: ['bg-aska'],
        });

        this.dialogRef.close();
      },
      () => {
        // Done
      },
    );
  }
}
