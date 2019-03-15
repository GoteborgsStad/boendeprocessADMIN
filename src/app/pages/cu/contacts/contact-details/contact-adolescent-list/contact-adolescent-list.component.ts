import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../_models/user/user.model';
import { UserService } from './../../../../../_services/user.service';

@Component({
  selector: 'app-contact-adolescent-list',
  templateUrl: './contact-adolescent-list.component.html',
})
export class ContactAdolescentListComponent implements OnInit {

  @Input() public user: User;
  public adolescents: User[];
  constructor(private _userService: UserService) { }

  public ngOnInit() {
    this._userService.getUserById(this.user.id).subscribe(
      (data: User) => this.user = data );
  }

}
