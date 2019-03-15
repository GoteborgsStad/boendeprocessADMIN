import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.component.html',
})

export class LoginDialogComponent implements OnInit {
  public view: number = 0;

  constructor() { }

  public ngOnInit() { }

  public switchView(value: number) {
    switch (value) {
      case 0:
        this.view = 0;
        break;
      case 1:
        this.view = 1;
        break;
      case 2:
        this.view = 2;
        break;
      default:
        this.view = 0;
        break;
    }
  }

  public mobileBankIdLogin(personalIdentificationNumber: string) {
    // console.log(personalIdentificationNumber);
  }
}
