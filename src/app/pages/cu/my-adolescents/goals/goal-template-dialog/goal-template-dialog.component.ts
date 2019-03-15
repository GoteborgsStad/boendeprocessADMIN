import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GoalTemplate } from '../../../../../_models/goal/goal-template.model';
import { Goal } from '../../../../../_models/goal/goal.model';
import { GoalService } from '../../../../../_services/goal.service';
import { GoalCategory } from './../../../../../_models/goal/goal-category.model';

@Component({
  selector: 'app-goal-template-dialog',
  templateUrl: './goal-template-dialog.component.html',
})
export class GoalTemplateDialogComponent implements OnInit {
  @Input() public goalCategories: GoalCategory[] = [];
  @Output() public reflectGoalTemplate: EventEmitter<{ position: number, goal: Goal }> =
    new EventEmitter<{ position: number, goal: Goal }>();
  public templateGoal: Goal;
  public goalTemplates: GoalTemplate[] = [];
  public showTemplates: GoalTemplate[] = [];
  public position;
  public category: string = 'Alla';

  constructor(public dialogRef: MatDialogRef<GoalTemplateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _goalService: GoalService) { }

  public ngOnInit() {
    this.goalCategories = this.data.categories;
    this._goalService.getGoalTemplates().subscribe((data: GoalTemplate[]) => {
      this.goalTemplates = data;
      this.filterCategoryTemplates(this.category);
    });
  }

  public setTemplate(selectedGoal: GoalTemplate) {
    this.templateGoal = selectedGoal;
  }

  public abort() {
    this.close();
  }

  public filterCategoryTemplates($event: any) {
    this.showTemplates = this.goalTemplates.filter((category: Goal) => {
      return category.goal_category.name === this.category || this.category === 'Alla';
    });
  }

  public apply() {
    this.reflectGoalTemplate.emit({ position: this.data.position, goal: this.templateGoal });
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

}
