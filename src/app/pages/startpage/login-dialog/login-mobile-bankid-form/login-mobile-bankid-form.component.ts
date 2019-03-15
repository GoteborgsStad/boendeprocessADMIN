import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies';

import { AuthenticationService } from '../../../../_services/authentication.service';

@Component({
  selector: 'app-login-mobile-bankid-form',
  templateUrl: './login-mobile-bankid-form.component.html',
})
export class LoginMobileBankIDFormComponent implements OnInit {
  public loginForm: FormGroup;

  // tslint:disable-next-line
  private submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginMobileBankIDFormComponent>,
    private _authenticationService: AuthenticationService,
  ) { }

  public ngOnInit() {
    this.loginForm = this._formBuilder.group({
      personalIdentityNumber: ['', Validators.required],
    });
  }

  public login({ value, valid }) {
    this._authenticationService.login({
      password: 'secret',
      personal_identity_number: value.personalIdentityNumber,
    }).subscribe(
      (res) => {
        this.dialogRef.close();

        if (Cookie.check('id_token')) {
          Cookie.delete('id_token');
        }

        Cookie.set('id_token', res.token, undefined, '/');

        this._router.navigate(['/cu']);
      },
      (err) => {
        this.dialogRef.close();

        this._snackbar.open('Det gick tyvärr inte att logga in', undefined, {
          duration: 5000,
          extraClasses: ['bg-aska'],
        });
      },
      () => {  },
    );
  }
}
