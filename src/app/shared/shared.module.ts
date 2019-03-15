import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationPipe } from '../_pipes/pagination.pipe';
import { ActionPanelComponent } from './action-panel/action-panel.component';
import { CategoryTemplateComponent } from './category-template/category-template.component';
import { EmptyListCardComponent } from './empty-list-card/empty-list-card.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { MaterialModule } from './material.module';
import { StatusCircleComponent } from './status-circle/status-circle.component';

@NgModule({
  declarations: [
    PaginationPipe,
    ActionPanelComponent,
    CategoryTemplateComponent,
    ImageFormComponent,
    EmptyListCardComponent,
    StatusCircleComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationPipe,
    ActionPanelComponent,
    CategoryTemplateComponent,
    ImageFormComponent,
    EmptyListCardComponent,
    StatusCircleComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
  ],
})
export class SharedModule { }
