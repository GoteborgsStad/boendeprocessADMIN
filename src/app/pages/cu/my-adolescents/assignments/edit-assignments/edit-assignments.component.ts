import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AssignmentCategoryService } from '../../../../../_services/assignment-category.service';
import { AssignmentFormService } from '../../../../../_services/assignment-form.service';
import { AssignmentService } from '../../../../../_services/assignment.service';
import { UserService } from '../../../../../_services/user.service';

import { MatDialog } from '@angular/material';
import { AssignmentCategory } from '../../../../../_models/assignment/assignment-category.model';
import { AssignmentForm } from '../../../../../_models/assignment/assignment-form.model';
import { Assignment } from '../../../../../_models/assignment/assignment.model';
import { User } from '../../../../../_models/user/user.model';
import { DeleteAssignmentsDialogComponent } from './delete-assignments-dialog/delete-assignments-dialog.component';
import { FinishAssignmentsDialogComponent } from './finish-assignments-dialog/finish-assignments-dialog.component';

@Component({
  selector: 'app-edit-assignments',
  templateUrl: 'edit-assignments.component.html',
})

export class EditAssignmentsComponent implements OnInit {
  public adolescent: User;
  public assignment: Assignment;
  public assignmentCategories: AssignmentCategory[];
  public assignmentForms: AssignmentForm[];
  public assignmentId: number;
  public userId: number;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _assignmentService: AssignmentService,
    private _assignmentCategoryService: AssignmentCategoryService,
    private _assignmentFormService: AssignmentFormService,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this._route.params.subscribe(
      (parameters) => {
        this.assignmentId = parameters.id;

        this._assignmentService.getAssignment(parameters.id).subscribe(
          (res) => {
            this.assignment = res;
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

    this._route.parent.params.subscribe(
      (parameters) => {
        this.userId = parameters.id;

        this._userService.getUser(parameters.id).subscribe(
          (res) => {
            this.adolescent = res;
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

    this._assignmentCategoryService.getAssignmentCategories().subscribe(
      (res) => {
        this.assignmentCategories = res;
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );

    this._assignmentFormService.getAssignmentForms().subscribe(
      (res) => {
        this.assignmentForms = res;
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }
  public openFinishAssignmentDialog() {
    const dialogRef = this._dialog.open(FinishAssignmentsDialogComponent, {
      maxWidth: '600px',
      minWidth: '600px',
    });

    dialogRef.componentInstance.assignmentId = this.assignmentId;
    dialogRef.componentInstance.assignment = this.assignment;
  }

  public openDeleteAssignmentDialog() {
    const dialogRef = this._dialog.open(DeleteAssignmentsDialogComponent, {
      maxWidth: '600px',
      minWidth: '600px',
    });

    dialogRef.componentInstance.assignmentId = this.assignmentId;
  }
}
