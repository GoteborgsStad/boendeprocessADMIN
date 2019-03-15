import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ChildRelationShip } from './../../../../_models/user/child-relationship.model';
import { GlobalStatus } from './../../../../_models/user/global-status.model';

import { User } from '../../../../_models/user/user.model';

import { UserType } from './../../../../_models/user/user-type.enum';

import { UserService } from './../../../../_services/user.service';

@Component({
  selector: 'app-list-my-adolescents',
  templateUrl: 'list-my-adolescents.component.html',
})

export class ListMyAdolescentsComponent implements OnInit, OnDestroy {
  public user: User;
  public users: User[] = [];
  public contactUsers: User[] = [];
  public selectedUser: User;
  public selectedUserChanged: boolean = false;
  public adolescentUsers = [];
  public showAdd: boolean = false;
  public refresh: Subscription;
  constructor(private _userService: UserService) { }

  public ngOnInit() {
    const observables: Array<Observable<any>> = [
      this._userService.getUsers(UserType.all),
      this._userService.getGlobalStatuses()];

    Observable.forkJoin(observables).subscribe((res: [User[], GlobalStatus[]]) => {
      this.users = res[0];
      this.updateUsers(res[1]);
    });
    this.refresh = Observable.interval(10000)
      .takeWhile(() => true)
        .subscribe(() =>
          this._userService.getGlobalStatuses().subscribe((data: GlobalStatus[]) => {
            this.updateUsers(data);
          },
        ),
      );
  }

  public ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  public updateUsers(statuses: GlobalStatus[]) {
    this.users.forEach((user: User) => {
      user.global_status = statuses.find((status: GlobalStatus) => {
        return status.id === user.id;
      });
    });
    this.contactUsers = this.onlyContactUsers();
    this.contactUsers.forEach((value: User) => {
      if (value.is_me && !this.selectedUserChanged) {
        this.selectedUser = value;
        this.filterAdolescents();
      }
    });
  }

  public getAdolescentList(id: number) {
    this._userService.getUserById(id).subscribe((singleUser: User) => {
      this.adolescentUsers = singleUser.child_relationships;
    });
  }

  public setAndFilter(event: {event, value}) {
    this.selectedUserChanged = true;
    this.user = event.value;
    this.filterAdolescents();
  }

  public filterAdolescents() {
    this.adolescentUsers = this.users.filter((user: User) => {
      return user.user_role.name === UserType.adolescentUser && this.isChildOfSelectedContactPerson(user);
    });
  }

  public onlyContactUsers(): User[] {
    return this.users.filter((user: User) => {
      return user.user_role.name === UserType.contactUser;
    });
  }

  public isChildOfSelectedContactPerson(user: User) {
    let isChild: boolean = false;
    user.parent_relationships.forEach((relationShip: ChildRelationShip) => {
      if (relationShip.parent.id === this.selectedUser.id) { isChild = true; }
    });
    return isChild;
  }
}
