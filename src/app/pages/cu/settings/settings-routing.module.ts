import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../../../_guards/authentication.guard';

import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        canActivate: [AuthenticationGuard],
        component: SettingsComponent,
        path: '',
        pathMatch: 'full',
      },
    ],
    component: SettingsComponent,
    path: '',
  },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(settingsRoutes),
  ],
})
export class SettingsRoutingModule { }
