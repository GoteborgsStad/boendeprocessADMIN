import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { User } from '../../_models/user/user.model';
import { UserService } from '../../_services/user.service';
import { UserChangeService } from './../../_services/user-change.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navigation-desktop',
  templateUrl: './navigation-desktop.component.html',
})
export class NavigationDesktopComponent implements OnInit {
  public me: User;
  public menus: object[] = [
    {
      icon: './assets/images/icons/icon_person_silhouette_aska.svg',
      name: 'Mina ungdomar',
      routerLink: '/cu/minaungdomar',
    },
    {
      icon: './assets/images/icons/icon_idBadge_aska.svg',
      name: 'Kontaktpersoner',
      routerLink: '/cu/kontaktpersoner',
    },
    {
      icon: './assets/images/icons/icon_cog_aska.svg',
      name: 'Inställningar',
      routerLink: '/cu/installningar',
    },
  ];

  constructor(
    private _router: Router,
    private _usersService: UserService,
    private _userChangeService: UserChangeService,
  ) { }

  public ngOnInit() {
    this._usersService.me().subscribe(
      (res) => {
        this.me = res;
      },
      (err) => {
        // console.log(err);
      },
      // () => { },
    );
    this._userChangeService.itemAdded$.subscribe((data: string) => {
      // console.log(data);
      this.me.user_detail.image_url = data;
    });
  }

  public logout() {
    Cookie.deleteAll('/');

    window.location.href = environment.IDP_LOGOUT;
  }
}
