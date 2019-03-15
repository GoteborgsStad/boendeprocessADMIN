import { NgModule } from '@angular/core/';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../../../../_guards/authentication.guard';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { EditGoalsComponent } from './edit-goals/edit-goals.component';
import { GoalsComponent } from './goals.component';
import { ListGoalsComponent } from './list-goals/list-goals.component';

const goalRoutes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        canActivate: [AuthenticationGuard],
        component: ListGoalsComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        canActivate: [AuthenticationGuard],
        component: EditGoalsComponent,
        path: ':id/edit',
      },
      {
        canActivate: [AuthenticationGuard],
        component: AddGoalsComponent,
        path: 'add',
      },
    ],
    component: GoalsComponent,
    path: '',
  },
];
@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(goalRoutes),
  ],
})
export class GoalsRoutingModule { }
