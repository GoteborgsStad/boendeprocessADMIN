import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddContactFormComponent } from './add-contact/add-contact-form/add-contact-form.component';

import { ContactsRoutingModule } from './contacts-routing.module';

import { SharingService } from '../../../_services/sharing.service';
import { UserService } from './../../../_services/user.service';

import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { SNamePipe } from '../../../_pipes/s-name.pipe';
import { AddContactComponent } from './add-contact/add-contact.component';
// tslint:disable-next-line:max-line-length
import { ContactAdolescentListComponent } from './contact-details/contact-adolescent-list/contact-adolescent-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactsComponent } from './contacts.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactCardComponent } from './list-contact/contact-card/contact-card.component';
import { ListContactComponent } from './list-contact/list-contact.component';

@NgModule({
  declarations: [
    AddContactComponent,
    ContactsComponent,
    EditContactComponent,
    ContactDetailsComponent,
    ListContactComponent,
    DeleteContactComponent,
    ContactCardComponent,
    AddContactFormComponent,
    ContactAdolescentListComponent,
    SNamePipe,
  ],
  exports: [
    ListContactComponent,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    UserService,
    SharingService,
  ],
})
export class ContactsModule { }
