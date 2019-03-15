import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-list-card',
  templateUrl: './empty-list-card.component.html',
})
export class EmptyListCardComponent implements OnInit {
  @Input() public text: string = '';

  constructor() { }

  public ngOnInit() {
  }

}
