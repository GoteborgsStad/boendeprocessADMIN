import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {
  TemplateAssignmentsDialogComponent,
} from './../../add-assignments/template-assignments-dialog/template-assignments-dialog.component';

import { File } from '../../../../../../_models/file.model';

import { AssignmentService } from '../../../../../../_services/assignment.service';
import { FileService } from '../../../../../../_services/file.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as Moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { AssignmentCategory } from '../../../../../../_models/assignment/assignment-category.model';
import { AssignmentForm } from '../../../../../../_models/assignment/assignment-form.model';
import { Assignment } from '../../../../../../_models/assignment/assignment.model';
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
  selector: 'app-edit-assignments-form',
  templateUrl: './edit-assignments-form.component.html',
})
export class EditAssignmentsFormComponent implements OnInit {
  @Input() public assignment: Assignment;
  @Input() public assignmentCategories: AssignmentCategory[];
  @Input() public assignmentForms: AssignmentForm[];
  @Input() public userId: number;
  public imageData: File = new File();
  public editAssignmentForm: FormGroup;
  public isActivity: boolean = false;
  public subscription: Subscription;
  public selectedAssignmentCategory: AssignmentCategory = new AssignmentCategory();
  public minDate: Date = new Date();
  // tslint:disable-next-line
  private submitted = false;

  constructor(
    public location: Location,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _assignmentService: AssignmentService,
    private _fileService: FileService,
    private _notificationService: NotificationService,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.editAssignmentForm = this._formBuilder.group({
      categoryId: [undefined],
      categoryName: [undefined, Validators.required],
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
      startDate: [null, Validators],
    });

    this._route.params.subscribe(
      (parameters) => {
        this._assignmentService.getAssignment(parameters.id).subscribe(
          (res) => {
            this.editAssignmentForm.patchValue({
              categoryName: res.assignment_category.id,
              checkbox0: false,
              checkbox1: false,
              checkbox2: false,
              description: res.description,
              endDate: Moment(res.end_at),
              name: res.name,
              startDate: (res.start_at !== null) ? Moment(res.start_at) : null,
            });

            for (const assignment_form of res.assignment_forms) {
              // tslint:disable-next-line
              (assignment_form.name === 'Foto') ? this.editAssignmentForm.get('checkbox0').setValue(true) : this.editAssignmentForm.get('checkbox0').setValue(false);
              // tslint:disable-next-line
              (assignment_form.name === 'Text') ? this.editAssignmentForm.get('checkbox1').setValue(true) : this.editAssignmentForm.get('checkbox1').setValue(false);
              // tslint:disable-next-line
              (assignment_form.name === 'Bocka av') ? this.editAssignmentForm.get('checkbox2').setValue(true) : this.editAssignmentForm.get('checkbox2').setValue(false);
            }

            this.onFormSelect();
            this.onBockSelect();
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );
      },
    );
  }

  public ngAfterContentChecked() {
    if (this.isFinished()) {
      this.editAssignmentForm.disable();
    }
  }

  public isFinished() {
    return this.assignment && this.assignment.finished_at;
  }

  public editAssignment({ value, valid }) {
    this.submitted = true;
    if (!valid) {
      this._notificationService.error_notification.next('Ett eller flera fält är tomma.');
      return;
    }

    if (
      (!this.editAssignmentForm.get('checkbox0').value) &&
      (!this.editAssignmentForm.get('checkbox1').value) &&
      (!this.editAssignmentForm.get('checkbox2').value)
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

    (this.editAssignmentForm.get('checkbox0').value) ? assignmentFormsId += ',1' : assignmentFormsId += '';
    (this.editAssignmentForm.get('checkbox1').value) ? assignmentFormsId += ',2' : assignmentFormsId += '';
    (this.editAssignmentForm.get('checkbox2').value) ? assignmentFormsId += ',3' : assignmentFormsId += '';

    assignmentFormsId = assignmentFormsId.slice(1);

    if (src === null)  {
      this._assignmentService.updateAssignment(this.assignment.id, {
        assignment_category_id: value.categoryName,
        assignment_forms_id: assignmentFormsId,
        description: value.description,
        end_at: value.endDate,
        image_description_uuid: (this.assignment.image_url === null) ? 'remove' : undefined,
        name: value.name,
        start_at: (value.start_at !== null) ? value.startDate : null,
        user_id: this.userId,
      }).subscribe(
        (res) => {
          this._notificationService.subj_notification.next('Uppdraget har nu uppdaterats!');
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
          this._assignmentService.updateAssignment(this.assignment.id, {
            assignment_category_id: value.categoryName,
            assignment_forms_id: assignmentFormsId,
            description: value.description,
            end_at: value.endDate,
            image_description_uuid: res.uuid,
            name: value.name,
            start_at: (value.startDate !== null) ? value.startDate : null,
            user_id: this.userId,
          }).subscribe(
            (res2) => {
              this._notificationService.subj_notification.next('Uppdraget är nu uppdaterat!');
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

  public openAssignmentTemplatesDialog() {
    const dialogRef = this._dialog.open(TemplateAssignmentsDialogComponent, {
      data: { categories: this.assignmentCategories },
      maxWidth: '700px',
      minWidth: '700px',
    });
    const sub: Subscription = dialogRef.componentInstance.reflectAssignmentTemplate.subscribe(
      (assignment: Assignment) => {
        if (assignment) {
          this.updateAssignmentEntry(assignment);
        }
      });
    this.subscription = dialogRef.afterClosed().subscribe((result: Assignment) => {
      sub.unsubscribe();
    });
  }

  public updateAssignmentEntry(data: any) {
    const assignment = this.editAssignmentForm;
    assignment.get('name').patchValue(data.goal.name);
    assignment.get('categoryId').patchValue(data.goal.assignment_category.id);
    assignment.get('description').patchValue(data.goal.assignment_category.description);
  }

  public readUrl(event: any) {
    if (event.target.files[0].size / 1048576 > 2) {
      this._notificationService.error_notification.next('Bildfilen får inte vara större än 2MB');
    } else {
      this.imageData.original_name = event.target.value.replace(/.*[\/\\]/, '').split('.').shift();

      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: any) => {
          this.imageData.base64 = event2.target.result;
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    }

  }

  public onFormSelect() {
    const checkbox0 = this.editAssignmentForm.get('checkbox0');
    const checkbox1 = this.editAssignmentForm.get('checkbox1');
    const checkbox2 = this.editAssignmentForm.get('checkbox2');

    if (checkbox0.value || checkbox1.value) {
      checkbox2.disable();

      this.editAssignmentForm.patchValue({
        checkbox2: false,
      });
    } else if (!checkbox0.value && !checkbox1.value) {
      checkbox2.enable();
    }
  }

  public onBockSelect() {
    if (this.editAssignmentForm.get('checkbox2').value) {
      this.editAssignmentForm.get('checkbox0').disable();
      this.editAssignmentForm.get('checkbox1').disable();

      this.editAssignmentForm.patchValue({
        checkbox0: false,
        checkbox1: false,
      });
    } else if (!this.editAssignmentForm.get('checkbox2').value) {
      this.editAssignmentForm.get('checkbox0').enable();
      this.editAssignmentForm.get('checkbox1').enable();
    }
  }
}
