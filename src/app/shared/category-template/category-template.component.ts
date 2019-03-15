import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from './../../_models/goal/goal.model';

@Component({
  selector: 'app-category-template',
  templateUrl: './category-template.component.html',
})
export class CategoryTemplateComponent implements OnInit {
  @Input('goal') public goal: Goal;
  @Output() public templateSelectedEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  public ngOnInit() {
  }

  public emitEvent() {
    this.templateSelectedEmitter.emit(this.goal);
  }

}
