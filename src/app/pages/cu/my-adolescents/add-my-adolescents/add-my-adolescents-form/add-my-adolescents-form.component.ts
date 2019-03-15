import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { MyErrorStateMatcher } from '../../../../../_directives/error-state.matcher';
import { RegUser } from '../../../../../_models/user/reg-user.model';
import { UserRelationship } from '../../../../../_models/user/user-relationship.model';
import { UserType } from '../../../../../_models/user/user-type.enum';
import { User } from '../../../../../_models/user/user.model';
import { UserService } from '../../../../../_services/user.service';

@Component({
  selector: 'app-add-my-adolescents-form',
  templateUrl: './add-my-adolescents-form.component.html',
})
export class AddMyAdolescentsFormComponent implements OnInit {
  @Output() public addContactEmitter: EventEmitter<User> = new EventEmitter();
  public addAdolescentForm: FormGroup;
  public matcher: ErrorStateMatcher;
  public users: User[] = [];
  public emailPattern =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(public fb: FormBuilder, private _userService: UserService, private _location: Location) {
    this.buildForm();
    this.matcher = new MyErrorStateMatcher();
  }

  public ngOnInit() {
    this._userService.getUsers(UserType.contactUser).subscribe((data: User[]) => this.users = data);
  }

  public buildForm() {
    this.addAdolescentForm = this.fb.group({
      contacts: new FormControl([], [Validators.required]),
      user: this.fb.group({
        email: new FormControl('', [
          Validators.required,
          // Validators.pattern(this.emailPattern),
        ]),
        first_name: new FormControl('', [
          Validators.required,
        ]),
        last_name: new FormControl('', [
          Validators.required,
        ]),
        personal_identity_number: new FormControl('', [
          Validators.required, /*ValidateOrgOrSsn,*/ Validators.minLength(12), Validators.maxLength(12),
        ]),
      }),
    });
  }

  public addAdolescent() {
    this._userService.registerUser(new RegUser(this.addAdolescentForm.controls.user.value), UserType.adolescentUser)
      .subscribe((newAdolescent: User) => {
        const contacts = this.addAdolescentForm.controls.contacts.value;
        this._userService.addConnections(newAdolescent, contacts ).subscribe((rels: UserRelationship[]) => {
          this.addContactEmitter.emit(newAdolescent);
        });

      });
  }

  public abort() {
    this._location.back();
  }

}
