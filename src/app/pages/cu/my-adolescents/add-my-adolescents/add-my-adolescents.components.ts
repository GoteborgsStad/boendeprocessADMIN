import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../../../_models/user/user.model';

@Component({
  selector: 'app-add-my-adolescents',
  templateUrl: 'add-my-adolescents.component.html',
})

export class AddMyAdolescentsComponent implements OnInit {

  constructor(private _snackbar: MatSnackBar, private _router: Router) { }

  public ngOnInit() { }

  public addedUser($event: User) {
    this._snackbar.open('Ungdom har skapats och kopplats till sin kontaktperson(er)', undefined, {
      duration: 5000,
      extraClasses: ['bg-arta'],
    });
    this._router.navigate(['/cu/minaungdomar/' + $event.id + '/goals/add']);
  }
}
