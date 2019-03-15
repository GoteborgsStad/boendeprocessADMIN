import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../../../../_guards/authentication.guard';

import { AddAssignmentsComponent } from './add-assignments/add-assignments.component';
import { AssignmentsComponent } from './assignments.component';
import { EditAssignmentsComponent } from './edit-assignments/edit-assignments.component';
import { ListAssignmentsComponent } from './list-assignments/list-assignments.component';

const assignmentsRoutes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        canActivate: [AuthenticationGuard],
        component: ListAssignmentsComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        canActivate: [AuthenticationGuard],
        component: EditAssignmentsComponent,
        path: ':id/edit',
      },
      {
        canActivate: [AuthenticationGuard],
        component: AddAssignmentsComponent,
        path: 'add',
      },
    ],
    component: AssignmentsComponent,
    path: '',
  },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(assignmentsRoutes),
  ],
})
export class AssignmentsRoutingModule { }
