import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../_models/user/user.model';
import { SharingService } from '../../../../_services/sharing.service';
import { UserService } from '../../../../_services/user.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent implements OnInit {

  public contactPerson: User = null;

  constructor(public sharingService: SharingService, private route: ActivatedRoute, private _userService: UserService) {
    // console.log("Welcome to SingleContact");
  }

  public ngOnInit() {
    const data = this.sharingService.getData();
    if (data !== null && typeof data !== 'undefined') {
      this.contactPerson = data;
      // console.log(data);
    } else {
      const id = +this.route.snapshot.paramMap.get('id');
      this._userService.getUserById(id)
        .subscribe((user: User) => this.contactPerson = user);
    }

  }

}
