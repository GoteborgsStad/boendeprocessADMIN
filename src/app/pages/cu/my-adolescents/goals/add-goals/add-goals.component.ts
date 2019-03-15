import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../../_models/user/user.model';
import { UserService } from '../../../../../_services/user.service';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
})
export class AddGoalsComponent implements OnInit {
  public user: User;

  constructor(private _userService: UserService, private _route: ActivatedRoute, public fb: FormBuilder) { }

  public ngOnInit() {
    this._route.parent.params.subscribe((data: any) => {
      this._userService.getUserById(data.id).subscribe((user: User) => this.user = user);
    });
  }
  public goalAdded() {

  }
}
