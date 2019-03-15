import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Assignment } from './../../../../../../_models/assignment/assignment.model';

import {
  TemplateAssignmentsDialogComponent,
} from '../template-assignments-dialog/template-assignments-dialog.component';

import { File } from '../../../../../../_models/file.model';

import { AssignmentService } from '../../../../../../_services/assignment.service';
import { FileService } from '../../../../../../_services/file.service';

import { Subscription } from 'rxjs';
import { AssignmentCategory } from '../../../../../../_models/assignment/assignment-category.model';
import { AssignmentForm } from '../../../../../../_models/assignment/assignment-form.model';
import { NotificationService } from '../../../../../../_services/notification.service';

export const MY_FORMATS = {
  display: {
    dateA11yLabel: 'LL',
    dateInput: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
  },
  parse: {
    dateInput: 'LL',
  },
};
@Component({
  providers: [{
    deps: [MAT_DATE_LOCALE],
    provide: DateAdapter,
    useClass: MomentDateAdapter,
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  selector: 'app-add-assignments-form',
  templateUrl: './add-assignments-form.component.html',
})
export class AddAssignmentsFormComponent implements OnInit {
  @Input() public assignmentCategories: AssignmentCategory[];
  @Input() public assignmentForms: AssignmentForm[];
  @Input() public userId: number;
  public imageData: File = new File();
  public addAssignmentForm: FormGroup;
  public isActivity: boolean = false;
  public subscription: Subscription;
  public minDate: Date = new Date();

  constructor(
    public location: Location,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _assignmentService: AssignmentService,
    private _fileService: FileService,
    private _notificationService: NotificationService,
  ) { }

  public ngOnInit() {
    this.addAssignmentForm = this._formBuilder.group({
      categoryId: [undefined, Validators.required],
      checkbox0: [
        {
          disabled: false,
          value: false,
        }, Validators,
      ],
      checkbox1: [
        {
          disabled: false,
          value: false,
        }, Validators,
      ],
      checkbox2: [
        {
          disabled: false,
          value: false,
        }, Validators,
      ],
      description: [undefined, Validators.required],
      endDate: [undefined, Validators.required],
      name: [undefined, Validators.required],
      startDate: [undefined, Validators],
    });
  }

  public addAssignment({ value, valid }) {
    const startDate: string = value.startDate === null ? null : value.startDate.format('YYYY-MM-DD');
    // console.log(startDate);
    if (!valid) {
      this._notificationService.error_notification.next('Ett eller flera fält är tomma.');
      return;
    }

    if (
      (!this.addAssignmentForm.get('checkbox0').value) &&
      (!this.addAssignmentForm.get('checkbox1').value) &&
      (!this.addAssignmentForm.get('checkbox2').value)
    ) {
      this._notificationService.error_notification.next('Val av svarsform fattas.');

      return;
    }

    // tslint:disable-next-line:max-line-length
    const base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$');

    let src = null;

    if (this.imageData.base64 !== undefined && base64Matcher.test(this.imageData.base64.split(',').pop())) {
      src = this.imageData.base64;
    }

    let assignmentFormsId = '';

    (this.addAssignmentForm.get('checkbox0').value) ? assignmentFormsId += ',1' : assignmentFormsId += '';
    (this.addAssignmentForm.get('checkbox1').value) ? assignmentFormsId += ',2' : assignmentFormsId += '';
    (this.addAssignmentForm.get('checkbox2').value) ? assignmentFormsId += ',3' : assignmentFormsId += '';

    assignmentFormsId = assignmentFormsId.slice(1);

    if (src === null) {
      this._assignmentService.postAssignment({
        assignment_category_id: value.categoryId,
        assignment_forms_id: assignmentFormsId,
        description: value.description,
        end_at: value.endDate.format('YYYY-MM-DD'),
        name: value.name,
        start_at: startDate,
        user_id: this.userId,
      }).subscribe(
        (res) => {
          this.location.back();
          this._notificationService.subj_notification.next('Uppdraget har nu skapats!');
        },
        (err) => {
          this._notificationService.error_notification.next('Något gick tyvärr fel, försök igen senare.');
        },
        () => {
          // Done
        },
      );
    } else {
      this._fileService.base64Image({
        base64_image: src,
        image_name: this.imageData.original_name,
      }).subscribe(
        (res) => {
          this._assignmentService.postAssignment({
            assignment_category_id: value.categoryId,
            assignment_forms_id: assignmentFormsId,
            description: value.description,
            end_at: value.endDate.format('YYYY-MM-DD'),
            image_description_uuid: res.uuid,
            name: value.name,
            start_at: startDate,
            user_id: this.userId,
          }).subscribe(
            (res2) => {
              this.location.back();
              this._notificationService.subj_notification.next('Uppdraget har nu skapats!');
            },
            (err2) => {
              this._notificationService.error_notification.next('Något gick tyvärr fel, försök igen senare.');
            },
            () => {
              // Done 2
            },
          );
        },
        (err) => {
          this._notificationService.error_notification.next('Något gick tyvärr fel, försök igen senare.');
        },
        () => {
          // Done
        },
      );
    }
  }

  public readUrl(event: any) {
    if (event.target.files[0].size / 1048576 > 2) {
      this._notificationService.error_notification.next('Bildfilen får inte vara större än 2MB');
    } else {
      this.imageData.original_name = event.target.value.replace(/.*[\/\\]/, '').split('.').shift();

      if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      console.log();
      reader.onload = (event2: any) => {
        this.imageData.base64 = event2.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    }

  }
  public openAssignmentTemplatesDialog() {
    const dialogRef = this._dialog.open(TemplateAssignmentsDialogComponent, {
      data: {categories: this.assignmentCategories},
      maxWidth: '700px',
      minWidth: '700px',
    });
    const sub: Subscription = dialogRef.componentInstance.reflectAssignmentTemplate.subscribe(
      (assignment: Assignment ) => {
        if (assignment) {
          this.updateAssignmentEntry(assignment);
        }
      });
    this.subscription = dialogRef.afterClosed().subscribe((result: Assignment) => {
      sub.unsubscribe();
    });
  }

  public updateAssignmentEntry(data: any) {
    const assignment = this.addAssignmentForm;
    assignment.get('name').setValue(data.goal.name);
    assignment.get('categoryId').setValue(data.goal.assignment_category.id);
    assignment.get('description').setValue(data.goal.assignment_category.description);
  }

  public onFormSelect() {
    const checkbox0 = this.addAssignmentForm.get('checkbox0');
    const checkbox1 = this.addAssignmentForm.get('checkbox1');
    const checkbox2 = this.addAssignmentForm.get('checkbox2');

    if (checkbox0.value || checkbox1.value) {
      checkbox2.disable();

      this.addAssignmentForm.patchValue({
        checkbox2: false,
      });
    } else if (!checkbox0.value && !checkbox1.value) {
      checkbox2.enable();
    }
  }

  public onBockSelect() {

    if (this.addAssignmentForm.get('checkbox2').value) {
      this.addAssignmentForm.get('checkbox0').disable();
      this.addAssignmentForm.get('checkbox1').disable();

      this.addAssignmentForm.patchValue({
        checkbox0: false,
        checkbox1: false,
      });
    } else if (!this.addAssignmentForm.get('checkbox2').value) {
      this.addAssignmentForm.get('checkbox0').enable();
      this.addAssignmentForm.get('checkbox1').enable();
    }
  }
}
