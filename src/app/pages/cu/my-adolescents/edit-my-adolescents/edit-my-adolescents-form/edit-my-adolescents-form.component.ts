import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { MyErrorStateMatcher } from '../../../../../_directives/error-state.matcher';
import { File } from '../../../../../_models/file.model';
import { UserType } from '../../../../../_models/user/user-type.enum';
import { User } from '../../../../../_models/user/user.model';
import { NotificationService } from '../../../../../_services/notification.service';
import { UserService } from '../../../../../_services/user.service';
import { AddContactDialogComponent } from './../add-contact-dialog/add-contact-dialog.component';

@Component({
  selector: 'app-edit-my-adolescents-form',
  templateUrl: './edit-my-adolescents-form.component.html',
})
export class EditMyAdolescentsFormComponent implements OnInit {
  @Input() public adolescent: User;
  @Output() public editAdolescentEmitter: EventEmitter<User> = new EventEmitter();
  public editAdolescentForm: FormGroup;
  public matcher: ErrorStateMatcher;
  private emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private isNumber = /(^[0-9]+[-]*[0-9]+$)/;

  constructor(
    public fb: FormBuilder,
    private _userService: UserService,
    public location: Location,
    private _dialog: MatDialog,
    private _notificationService: NotificationService,
  ) {
    this.buildForm();
    this.matcher = new MyErrorStateMatcher();
  }

  public ngOnInit() {
    this._userService.getUser(this.adolescent.id).subscribe(
      (data: User) => {
        this.adolescent = data; this.updateForm();
      },
    );
  }

  public removeAvatar() {
    const user = this.editAdolescentForm.controls.user as FormGroup;
    const image_urlControl = user.controls.image_url as FormControl;
    image_urlControl.setValue('');
  }

  public updateAvatar($event: File) {
    const user = this.editAdolescentForm.controls.user as FormGroup;
    const image_urlControl = user.controls.image_url as FormControl;
    image_urlControl.setValue($event.base64);
    this.adolescent.user_detail.image_url = $event.base64;
  }

  public buildForm() {
    this.editAdolescentForm = this.fb.group({
      location: this.fb.group({
        city: new FormControl('', []),
        street_address: new FormControl('', []),
        zip_code: new FormControl('', []),
      }),
      user: this.fb.group({
        cell_phone_number: new FormControl(
          '',
          [
            Validators.required,
            Validators.maxLength(12),
            Validators.pattern(this.isNumber),
          ],
        ),
        created_at: new FormControl({value: '', disabled: true}),
        email: new FormControl('', [
          Validators.required,
          // Validators.pattern(this.emailPattern),
        ]),
        first_name: new FormControl('', [Validators.required]),
        image_url: new FormControl(''),
        last_name: new FormControl('', [Validators.required]),
        personal_identity_number: new FormControl('', [
          Validators.required, /*ValidateOrgOrSsn,*/
          Validators.minLength(12),
          Validators.maxLength(12),
        ]),
      }),
    });
  }

  public updateForm() {
    // console.log('test', this.adolescent.user_detail.image_url);
    this.editAdolescentForm.patchValue({
      location: {
        city: this.adolescent.user_detail.city,
        street_address: this.adolescent.user_detail.street_address,
        zip_code: this.adolescent.user_detail.zip_code,
      },
      user: {
        cell_phone_number: this.adolescent.user_detail.cell_phone_number,
        created_at: this.adolescent.created_at,
        email: this.adolescent.user_detail.email,
        first_name: this.adolescent.user_detail.first_name,
        image_url: typeof this.adolescent.user_detail.image_url === 'undefined' ?
          '' : this.adolescent.user_detail.image_url,
        last_name: this.adolescent.user_detail.last_name,
        personal_identity_number: this.adolescent.personal_identity_number,
      },
    });
    this.editAdolescentForm.updateValueAndValidity();
  }

  public editAdolescent() {
    this.adolescent.personal_identity_number = this.editAdolescentForm.controls.user.value.personal_identity_number;
    this.adolescent.user_detail =
      Object.assign(this.adolescent.user_detail, this.editAdolescentForm.controls.location.value);
    this.adolescent.user_detail =
      Object.assign(this.adolescent.user_detail, this.editAdolescentForm.controls.user.value);
    this.editAdolescentEmitter.emit(this.adolescent);
  }

  public removePicture() {

  }

  public showAddContactDialog() {
    this._userService.getUsers(UserType.contactUser).subscribe((data: User[]) => {
      const dialogRef = this._dialog.open(AddContactDialogComponent, {
      data: { contacts: data, adolescent: this.adolescent },
      maxHeight: '600px',
      width: '600px',
    });

      dialogRef.afterClosed().subscribe((data: User[]) =>  {
      if (data && data.length > 0) {
        this._userService.addConnections(this.adolescent, data).subscribe(
          (result: any) => {
            this._notificationService.subj_notification.next('Kontakten har lagts till');
            this.ngOnInit();
          },
          (error: any) => {
            this._notificationService.error_notification.next('Ett fel har upstöd');
          },
      );
      }

    });
    });
  }

  public deleteContact(id: number) {
    this._userService.deleteRelationship(id).subscribe((data) => {
      this._notificationService.subj_notification.next(
        'Kopplingen mellan ungdomen och kontaktpersonen har tagits bort',
      );
      this.ngOnInit();
    },
    (err) => {
      this._notificationService.error_notification.next('Ett fel har upstöd');
    });
  }
}
