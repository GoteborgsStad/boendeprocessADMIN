import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoalService } from '../../../../_services/goal.service';
import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AddGoalFormComponent } from './add-goals/add-goal-form/add-goal-form.component';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { DeleteGoalDialogComponent } from './edit-goals/delete-goal-dialog/delete-goal-dialog.component';
import { EditGoalFormComponent } from './edit-goals/edit-goal-form/edit-goal-form.component';
import { EditGoalsComponent } from './edit-goals/edit-goals.component';

import { GoalTemplateDialogComponent } from './goal-template-dialog/goal-template-dialog.component';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './goals.component';
import { ListGoalsComponent } from './list-goals/list-goals.component';

@NgModule({

  declarations: [
    ListGoalsComponent,
    GoalsComponent,
    AddGoalsComponent,
    EditGoalsComponent,
    AddGoalFormComponent,
    GoalTemplateDialogComponent,
    EditGoalFormComponent,
    DeleteGoalDialogComponent],
  entryComponents: [
    GoalTemplateDialogComponent,
    DeleteGoalDialogComponent,
  ],
  imports: [
    GoalsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    GoalService,
  ],
})
export class GoalsModule { }
