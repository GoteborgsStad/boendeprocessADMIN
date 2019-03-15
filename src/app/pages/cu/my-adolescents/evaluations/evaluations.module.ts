import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EvaluationsRoutingModule } from './evaluations-routing.module';

import { EvaluateEvaluationsComponent } from './evaluate-evaluations/evaluate-evaluations.component';
import { EvaluationsComponent } from './evaluations.component';
import { ListEvaluationsComponent } from './list-evaluations/list-evaluations.component';

import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';
// tslint:disable-next-line:max-line-length
import { ConfirmEvaluateDialogComponent } from './evaluate-evaluations/confirm-evaluate-dialog/confirm-evaluate-dialog.component';
// tslint:disable-next-line:max-line-length
import { ConfirmEvaluationFormComponent } from './evaluate-evaluations/confirm-evaluate-dialog/confirm-evaluation-form/confirm-evaluation-form.component';

@NgModule({
  declarations: [
    EvaluationsComponent,
    ListEvaluationsComponent,
    EvaluateEvaluationsComponent,
    ConfirmEvaluateDialogComponent,
    ConfirmEvaluationFormComponent,
  ],
  entryComponents: [
    ConfirmEvaluateDialogComponent,
  ],
  exports: [

  ],
  imports: [
    EvaluationsRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [

  ],
})
export class EvaluationsModule { }
