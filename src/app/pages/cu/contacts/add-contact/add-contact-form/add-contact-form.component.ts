import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { MyErrorStateMatcher } from '../../../../../_directives/error-state.matcher';
import { ValidateOrgOrSsn } from '../../../../../_directives/ssn.validator';
import { RegUser } from '../../../../../_models/user/reg-user.model';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
})
export class AddContactFormComponent implements OnInit {
  @Output() public addContactEmitter: EventEmitter<RegUser> = new EventEmitter();
  @Output() public abortAddContactEmitter: EventEmitter<any> = new EventEmitter();
  public addContactForm: FormGroup;
  public matcher: ErrorStateMatcher;
  private emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private isNumber = /(^[0-9]+[-]*[0-9]+$)/;

  constructor(public fb: FormBuilder) {
    this.buildForm();
    this.matcher = new MyErrorStateMatcher();
  }

  public ngOnInit() {

  }

  public buildForm() {
    this.addContactForm = this.fb.group({
      cell_phone_number: new FormControl('', [Validators.maxLength(12), Validators.pattern(this.isNumber)]),
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
        Validators.required, ValidateOrgOrSsn, Validators.maxLength(12), Validators.minLength(12),
      ]),
    });
  }

  public addContact() {
    const newUser = new RegUser(this.addContactForm.value);
    this.addContactEmitter.emit(newUser);
  }

  public abort() {
    this.abortAddContactEmitter.emit();
  }
}
