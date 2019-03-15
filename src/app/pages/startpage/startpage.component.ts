import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Cookie } from 'ng2-cookies';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
})
export class StartpageComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  public ngOnInit() {
    const token = this._activatedRoute.snapshot.queryParamMap.get('token');
    const appToken = this._activatedRoute.snapshot.queryParamMap.get('appToken');

    if (token) {
      if (Cookie.check('id_token')) {
        Cookie.delete('id_token');
      }

      Cookie.set('id_token', token, undefined, '/');

      this._router.navigate(['/cu']);
    }

    if (appToken) {
      try{
        // @ts-ignore
        Unity.call(appToken);
      }catch(e){
        //
      }

      window.location.href = 'uniwebview://onResponse?token=' + appToken;
    }
  }

  public openLoginDialog() {
    window.location.href = environment.IDP_LOGIN;

    // this._dialog.open(LoginDialogComponent, {
    //   maxWidth: '600px',
    //   minWidth: '600px',
    // });
  }
}
