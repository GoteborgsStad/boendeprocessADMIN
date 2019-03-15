import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { File } from '../../../../_models/file.model';
import { User } from '../../../../_models/user/user.model';
import { FileService } from '../../../../_services/file.service';
import { NotificationService } from '../../../../_services/notification.service';
import { UserChangeService } from '../../../../_services/user-change.service';
import { UserService } from '../../../../_services/user.service';

@Component({
  selector: 'app-edit-detail-form',
  templateUrl: './edit-detail-form.component.html',
})
export class EditDetailFormComponent implements OnInit {
  @Input() public me: User;
  public updateMeForm: FormGroup;

  // tslint:disable-next-line
  private submitted = false;
  private emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  private isNumber = /(^[0-9]+[-]*[0-9]+$)/;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _fileService: FileService,
    private _notificationService: NotificationService,
    private _userChangeService: UserChangeService,
  ) { }

  public ngOnInit() {
    this.updateMeForm = this._formBuilder.group({
      email: ['',
        [
          Validators.required,
          // Validators.pattern(this.emailPattern)
        ]
      ],
      emailAdolescentsFinishedAssignment: ['', Validators.required],
      emailAdolescentsSentMessage: ['', Validators.required],
      emailReminderForMonthlyEvaluation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.maxLength(12), Validators.pattern(this.isNumber)]],
    });
  }

  public ngOnChanges() {
    if (this.me !== undefined) {
      this.updateMeForm.patchValue({
        email: this.me.user_detail.email,
        firstName: this.me.user_detail.first_name,
        lastName: this.me.user_detail.last_name,
        phoneNumber: this.me.user_detail.cell_phone_number,
      });

      for (const config of this.me.user_configurations) {
        switch (config.key) {
          case 'email_adolescents_finished_assignment':
            this.updateMeForm.patchValue({
              emailAdolescentsFinishedAssignment: (config.value === '1') ? true : false,
            });
            break;
          case 'email_adolescents_sent_message':
            this.updateMeForm.patchValue({
              emailAdolescentsSentMessage: (config.value === '1') ? true : false,
            });
            break;
          case 'email_reminder_for_monthly_evaluation':
            this.updateMeForm.patchValue({
              emailReminderForMonthlyEvaluation: (config.value === '1') ? true : false,
            });
            break;
          default:
            break;
        }
      }
    }
  }

  public updateImage($event) {
    this.me.user_detail.image_name = null;
    this.me.user_detail.image_url = null;
  }

  public getImage(value: File) {
    this.me.user_detail.image_url    = value.base64;
    this.me.user_detail.image_name   = value.original_name;
    this._userChangeService.add(this.me.user_detail.image_url);
  }

  public updateMe({ value, valid }) {
    this.submitted = true;

    if (!valid) {
      this._notificationService.error_notification.next('Ett eller flera fält är tomma.');
      return;
    }

    // tslint:disable-next-line:max-line-length
    const base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$');

    let src = null;

    if (this.me.user_detail.image_url !== null && base64Matcher.test(this.me.user_detail.image_url.split(',').pop())) {
      src = this.me.user_detail.image_url;
    }

    if (src === null) {
      this._userService.updateMe({
        cell_phone_number: value.phoneNumber,
        email: value.email,
        email_adolescents_finished_assignment: (value.emailAdolescentsFinishedAssignment === true) ? '1' : '0',
        email_adolescents_sent_message: (value.emailAdolescentsSentMessage === true) ? '1' : '0',
        email_reminder_for_monthly_evaluation: (value.emailReminderForMonthlyEvaluation === true) ? '1' : '0',
        first_name: value.firstName,
        image_uuid: 'remove',
        last_name: value.lastName,
      }).subscribe(
        (res) => {
          this._notificationService.subj_notification.next('Dina användaruppgifter har nu uppdaterats!');
        },
        (err) => {
          this._notificationService.error_notification.next('Något gick tyvärr fel, försök igen senare.');
        },
        () => {
          this._userChangeService.add(this.me.user_detail.image_url);
        },
      );
    } else {
      this._fileService.base64Image({
        base64_image: src,
        image_name: this.me.user_detail.image_name,
      }).subscribe(
        (res) => {
          this._userService.updateMe({
            cell_phone_number: value.phoneNumber,
            email: value.email,
            email_adolescents_finished_assignment: (value.emailAdolescentsFinishedAssignment === true) ? '1' : '0',
            email_adolescents_sent_message: (value.emailAdolescentsSentMessage === true) ? '1' : '0',
            email_reminder_for_monthly_evaluation: (value.emailReminderForMonthlyEvaluation === true) ? '1' : '0',
            first_name: value.firstName,
            image_uuid: res.uuid,
            last_name: value.lastName,
          }).subscribe(
            (res2) => {
              this.me.user_detail.image_url = res2.user_detail.image_url;
              this._notificationService.subj_notification.next('Dina användaruppgifter har nu uppdaterats!');
            },
            (err2) => {
              this._notificationService.error_notification.next('Något gick tyvärr fel, försök igen senare.');
            },
            () => {
              // Done
            },
          );
        },
        (err) => {
         // console.log(err);
        },
        () => {
          // Done
        },
      );
    }
  }
}
