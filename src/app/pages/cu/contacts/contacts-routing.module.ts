import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../../../_guards/authentication.guard';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactsComponent } from './contacts.component';
import { ListContactComponent } from './list-contact/list-contact.component';

const contactsRoutes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    children: [
      {
        component: ListContactComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        component: AddContactComponent,
        path: 'add',
      },
      {
        component: ContactDetailsComponent,
        path: ':id',
      },
    ],
    component: ContactsComponent,
    path: '',
  },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(contactsRoutes),
  ],
})
export class ContactsRoutingModule { }
