import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChildRelationShip } from '../../../../../_models/user/child-relationship.model';
import { User } from '../../../../../_models/user/user.model';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
})
export class AddContactDialogComponent implements OnInit {

  public users: User[] = [];
  public adolescent: User;
  public testuser = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<AddContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.users = data.contacts;
    this.adolescent = data.adolescent;
    this.assembleContacts();
  }

  public ngOnInit() {}

  public assembleContacts() {

    this.users = this.users.filter((user: User) => {
      let isConnected = false;
      this.adolescent.parent_relationships.forEach((parent: ChildRelationShip) => {
        if (parent.parent.id === user.id) { isConnected = true; }
      });
      return !isConnected;
    });

  }

  public isSelected(user: User) {
    let isSelected = false;
    this.adolescent.parent_relationships.forEach((currentContact: ChildRelationShip) => {
      isSelected = currentContact.parent.id === user.id;
    });
    return isSelected;
  }

  public addUser() {
    const user: User = this.getSelectedUser();
    this.dialogRef.close(user);
  }

  public getSelectedUser() {
    let resultUser;
    resultUser =  this.users.filter((user: User) => {
      return user.id === this.testuser.value;
    });
    return resultUser;
  }

}
