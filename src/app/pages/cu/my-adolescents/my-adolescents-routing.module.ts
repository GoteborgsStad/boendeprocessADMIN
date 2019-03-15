import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './../../../_guards/authentication.guard';

import { AddMyAdolescentsComponent } from './add-my-adolescents/add-my-adolescents.components';
import { ChatMyAdolescentsComponent } from './chat-my-adolescents/chat-my-adolescents.component';
import { DetailMyAdolescentsComponent } from './detail-my-adolescents/detail-my-adolescents.component';
import { EditMyAdolescentsComponent } from './edit-my-adolescents/edit-my-adolescents.component';
import { ListMyAdolescentsComponent } from './list-my-adolescents/list-my-adolescents.component';
import { MyAdolescentsComponent } from './my-adolescents.component';

const myAdolescentsRoutes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        canActivate: [AuthenticationGuard],
        component: ListMyAdolescentsComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        canActivate: [AuthenticationGuard],
        component: AddMyAdolescentsComponent,
        path: 'add',
      },
      {
        canActivate: [AuthenticationGuard],
        component: DetailMyAdolescentsComponent,
        path: ':id/detail',
      },
      {
        canActivate: [AuthenticationGuard],
        component: EditMyAdolescentsComponent,
        path: ':id/edit',
      },
      {
        canActivate: [AuthenticationGuard],
        loadChildren: './assignments/assignments.module#AssignmentsModule',
        path: ':id/assignments',
      },
      {
        canActivate: [AuthenticationGuard],
        loadChildren: './goals/goals.module#GoalsModule',
        path: ':id/goals',
      },
      {
        canActivate: [AuthenticationGuard],
        loadChildren: './evaluations/evaluations.module#EvaluationsModule',
        path: ':id/evaluations',
      },
      {
        canActivate: [AuthenticationGuard],
        component: ChatMyAdolescentsComponent,
        path: ':id/chat',
      },
    ],
    component: MyAdolescentsComponent,
    path: '',
  },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(myAdolescentsRoutes),
  ],
})
export class MyAdolescentsRoutingModule { }
