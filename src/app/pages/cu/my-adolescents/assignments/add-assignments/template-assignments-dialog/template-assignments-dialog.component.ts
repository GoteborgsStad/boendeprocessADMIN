import { AssignmentCategory } from './../../../../../../_models/assignment/assignment-category.model';

import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AssignmentTemplate } from '../../../../../../_models/assignment/assignment-template.model';
import { Assignment } from '../../../../../../_models/assignment/assignment.model';
import { AssignmentService } from '../../../../../../_services/assignment.service';

@Component({
  selector: 'app-template-assignments-dialog',
  templateUrl: './template-assignments-dialog.component.html',
})
export class TemplateAssignmentsDialogComponent implements OnInit {
  @Input() public assignmentCategories: AssignmentCategory[] = [];
  @Output() public reflectAssignmentTemplate: EventEmitter<{ position: number, goal: Assignment }> =
    new EventEmitter<{ position: number, goal: Assignment }>();
  public templateAssignment: Assignment;
  public assignmentTemplates: AssignmentTemplate[] = [];
  public showTemplates: AssignmentTemplate[] = [];
  public position;
  public category: string = 'Alla';

  constructor(public dialogRef: MatDialogRef<TemplateAssignmentsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _assignmentService: AssignmentService) {
    this.assignmentCategories = this.data.categories;
    this._assignmentService.getAssignmentTemplates().subscribe((templates: AssignmentTemplate[]) => {
      this.assignmentTemplates = templates;
      this.filterCategoryTemplates(this.category);
    });
  }

  public ngOnInit() {

  }

  public setTemplate(selectedGoal: AssignmentTemplate) {
    this.templateAssignment = selectedGoal;
  }

  public abort() {
    this.close();
  }

  public filterCategoryTemplates($event: any) {
    this.showTemplates = this.assignmentTemplates.filter((category: AssignmentTemplate) => {
      return category.assignment_category.name === this.category || this.category === 'Alla';
    });
  }

  public apply() {
    this.reflectAssignmentTemplate.emit({ position: this.data.position, goal: this.templateAssignment });
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

}
