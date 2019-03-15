import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharingService } from '../../../../_services/sharing.service';
import { UserService } from '../../../../_services/user.service';
import { UserType } from './../../../../_models/user/user-type.enum';
import { User } from './../../../../_models/user/user.model';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
})
export class ListContactComponent implements OnInit, OnDestroy {

  public contactPersons: User[] = new Array<User>();
  public subs: Subscription[] = new Array<Subscription>();
  public history: User[] = [];
  public nextMission = 0;
  constructor(public contactPersonSrvc: UserService, private _router: Router, public sharingService: SharingService) { }

  public ngOnInit() {
    this.subs[0] = this.contactPersonSrvc.getUsers(UserType.contactUser).subscribe(
      (contactPersons: User[]) => this.contactPersons = contactPersons,
    );
  }

  public ngOnDestroy(): void {
    this.subs.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public passToSingle(contactPerson: User) {
    this.sharingService.setData(contactPerson);
    this._router.navigate(['/cu/kontaktpersoner/' + contactPerson.id]);
  }

  public stopBubble($event: Event) {
    $event.cancelBubble = true;
  }

}
