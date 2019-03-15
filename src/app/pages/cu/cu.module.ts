import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CuRoutingModule } from './cu.routing';

import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

import { CuComponent } from './cu.component';

import { SharingService } from '../../_services/sharing.service';
import { NavigationDesktopComponent } from '../../shared/navigation-desktop/navigation-desktop.component';

@NgModule({
  bootstrap: [
    CuComponent,
  ],
  declarations: [
    CuComponent,
    NavigationDesktopComponent,
  ],
  entryComponents: [

  ],
  imports: [
    CommonModule,
    CuRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    SharingService,
  ],
})
export class CuModule { }
