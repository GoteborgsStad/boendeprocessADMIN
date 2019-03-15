import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AssignmentCategoryService } from '../../../../../_services/assignment-category.service';
import { AssignmentFormService } from '../../../../../_services/assignment-form.service';
import { UserService } from '../../../../../_services/user.service';

import { AssignmentCategory } from '../../../../../_models/assignment/assignment-category.model';
import { AssignmentForm } from '../../../../../_models/assignment/assignment-form.model';
import { User } from '../../../../../_models/user/user.model';

@Component({
  selector: 'app-add-assignments',
  templateUrl: 'add-assignments.component.html',
})

export class AddAssignmentsComponent implements OnInit {
  public adolescent: User;
  public assignmentCategories: AssignmentCategory[];
  public assignmentForms: AssignmentForm[];
  public userId: number;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _assignmentCategoryService: AssignmentCategoryService,
    private _assignmentFormService: AssignmentFormService,
  ) { }

  public ngOnInit() {
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
}
