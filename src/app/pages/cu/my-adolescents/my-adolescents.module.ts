import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentPipe } from './../../../_pipes/moment.pipe';

import { MyAdolescentsRoutingModule } from './my-adolescents-routing.module';

import { AddMyAdolescentsComponent } from './add-my-adolescents/add-my-adolescents.components';
import { ChatMyAdolescentsComponent } from './chat-my-adolescents/chat-my-adolescents.component';
import { DetailMyAdolescentsComponent } from './detail-my-adolescents/detail-my-adolescents.component';
import { EditMyAdolescentsComponent } from './edit-my-adolescents/edit-my-adolescents.component';
import { ListMyAdolescentsComponent } from './list-my-adolescents/list-my-adolescents.component';
import { MyAdolescentsComponent } from './my-adolescents.component';

import { SharingService } from '../../../_services/sharing.service';
// tslint:disable-next-line:max-line-length
import { AddChatMessageFormComponent } from './chat-my-adolescents/add-chat-message-form/add-chat-message-form.component';

import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
// tslint:disable-next-line:max-line-length
import { AddMyAdolescentsFormComponent } from './add-my-adolescents/add-my-adolescents-form/add-my-adolescents-form.component';
import { AddContactDialogComponent } from './edit-my-adolescents/add-contact-dialog/add-contact-dialog.component';
// tslint:disable-next-line:max-line-length
import { DeleteMyAdolescentDialogComponent } from './edit-my-adolescents/delete-my-adolescent-dialog/delete-my-adolescent-dialog.component';
// tslint:disable-next-line:max-line-length
import { EditMyAdolescentsFormComponent } from './edit-my-adolescents/edit-my-adolescents-form/edit-my-adolescents-form.component';
import { AdolescentCardComponent } from './list-my-adolescents/adolescent-card/adolescent-card.component';

@NgModule({
  declarations: [
    MyAdolescentsComponent,
    DetailMyAdolescentsComponent,
    ChatMyAdolescentsComponent,
    AddChatMessageFormComponent,
    AddMyAdolescentsComponent,
    EditMyAdolescentsComponent,
    ListMyAdolescentsComponent,
    AdolescentCardComponent,
    AddMyAdolescentsFormComponent,
    EditMyAdolescentsFormComponent,
    DeleteMyAdolescentDialogComponent,
    AddContactDialogComponent,
    MomentPipe,
  ],
  entryComponents: [
    DeleteMyAdolescentDialogComponent,
    AddContactDialogComponent,
  ],
  exports: [

  ],
  imports: [
    MyAdolescentsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    SharingService,
  ],
})
export class MyAdolescentsModule { }
