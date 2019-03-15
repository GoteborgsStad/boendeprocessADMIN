import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../../../../_guards/authentication.guard';

import { EvaluateEvaluationsComponent } from './evaluate-evaluations/evaluate-evaluations.component';
import { EvaluationsComponent } from './evaluations.component';
import { ListEvaluationsComponent } from './list-evaluations/list-evaluations.component';

const evaluationsRoutes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        canActivate: [AuthenticationGuard],
        component: ListEvaluationsComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        canActivate: [AuthenticationGuard],
        component: EvaluateEvaluationsComponent,
        path: ':id/evaluate',
      },
    ],
    component: EvaluationsComponent,
    path: '',
  },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(evaluationsRoutes),
  ],
})
export class EvaluationsRoutingModule { }
