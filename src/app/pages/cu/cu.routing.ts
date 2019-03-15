import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../../_guards/authentication.guard';

import { CuComponent } from './cu.component';

const routes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        canActivate: [AuthenticationGuard],
        path: '',
        pathMatch: 'full',
        redirectTo: 'minaungdomar',
      },
      {
        canActivate: [AuthenticationGuard],
        loadChildren: './my-adolescents/my-adolescents.module#MyAdolescentsModule',
        path: 'minaungdomar',
      },
      {
        canActivate: [AuthenticationGuard],
        loadChildren: './contacts/contacts.module#ContactsModule',
        path: 'kontaktpersoner',
      },
      {
        canActivate: [AuthenticationGuard],
        loadChildren: './settings/settings.module#SettingsModule',
        path: 'installningar',
      },
    ],
    component: CuComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CuRoutingModule { }
