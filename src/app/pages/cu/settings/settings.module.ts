import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';

import { DeleteMeDialogComponent } from './delete-me-dialog/delete-me-dialog.component';
import { DeleteMeFormComponent } from './delete-me-dialog/delete-me-form/delete-me-form.component';
import { EditDetailFormComponent } from './edit-detail-form/edit-detail-form.component';
import { SettingsComponent } from './settings.component';

import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    SettingsComponent,
    DeleteMeDialogComponent,
    DeleteMeFormComponent,
    EditDetailFormComponent,
  ],
  entryComponents: [
    DeleteMeDialogComponent,
  ],
  exports: [

  ],
  imports: [
    SettingsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [

  ],
})
export class SettingsModule { }
