import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivate, Router } from '@angular/router';

import { Jwt } from '../_models/jwt.model';
import { UserType } from '../_models/user/user-type.enum';

import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private jwt: Jwt;
  private userRole: string;
  private token: string;

  constructor(
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) { }

  public canActivate() {
    this.token     = Cookie.get('id_token');
    this.jwt       = new Jwt(this.token);
    this.userRole  = this.jwt.role;
    const diff     = Math.floor((Math.abs((new Date()).valueOf() - (new Date(this.jwt.exp)).valueOf()) / 1000) / 60);

    if (this.token && this.userRole) {
      if (this.userRole === UserType.contactUser || this.userRole === UserType.systemUser && diff <= 0) {
        return true;
      }
    }

    this._router.navigate(['']).then((val) => {
      Cookie.deleteAll('/');

      this._snackbar.open('Denna användare är inte av typen kontaktperson', undefined, {
        duration: 5000,
        extraClasses: ['bg-aska'],
      });

      return false;
    });
  }
}
