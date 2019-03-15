import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssignmentsRoutingModule } from './assignments-routing.module';

import { AddAssignmentsComponent } from './add-assignments/add-assignments.component';
// tslint:disable-next-line:max-line-length
import { TemplateAssignmentsDialogComponent } from './add-assignments/template-assignments-dialog/template-assignments-dialog.component';
import { AssignmentsComponent } from './assignments.component';
import { EditAssignmentsComponent } from './edit-assignments/edit-assignments.component';
import { ListAssignmentsComponent } from './list-assignments/list-assignments.component';

import { AddAssignmentsFormComponent } from './add-assignments/add-assignments-form/add-assignments-form.component';
// tslint:disable-next-line:max-line-length
import { DeleteAssignmentsDialogComponent } from './edit-assignments/delete-assignments-dialog/delete-assignments-dialog.component';
// tslint:disable-next-line:max-line-length
import { DeleteAssignmentsFormComponent } from './edit-assignments/delete-assignments-dialog/delete-assignments-form/delete-assignments-form.component';
import { DeleteAssignmentsComponent } from './edit-assignments/delete-assignments/delete-assignments.component';
import { EditAssignmentsFormComponent } from './edit-assignments/edit-assignments-form/edit-assignments-form.component';

import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';

// tslint:disable-next-line:max-line-length
import { FinishAssignmentsDialogComponent } from './edit-assignments/finish-assignments-dialog/finish-assignments-dialog.component';
// tslint:disable-next-line:max-line-length
import { FinishAssignmentsFormComponent } from './edit-assignments/finish-assignments-dialog/finish-assignments-form/finish-assignments-form.component';
import { FinishAssignmentsComponent } from './edit-assignments/finish-assignments/finish-assignments.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    EditAssignmentsComponent,
    EditAssignmentsFormComponent,
    FinishAssignmentsComponent,
    FinishAssignmentsDialogComponent,
    FinishAssignmentsFormComponent,
    AddAssignmentsComponent,
    AddAssignmentsFormComponent,
    ListAssignmentsComponent,
    TemplateAssignmentsDialogComponent,
    DeleteAssignmentsComponent,
    DeleteAssignmentsDialogComponent,
    DeleteAssignmentsFormComponent,
  ],
  entryComponents: [
    TemplateAssignmentsDialogComponent,
    DeleteAssignmentsDialogComponent,
    FinishAssignmentsDialogComponent,
  ],
  exports: [

  ],
  imports: [
    AssignmentsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [

  ],
})
export class AssignmentsModule { }
