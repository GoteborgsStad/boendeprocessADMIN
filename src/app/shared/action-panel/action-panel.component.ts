import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  } from 'selenium-webdriver';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
})
export class ActionPanelComponent implements OnInit {
  @Input() public caption: string = 'Ta bort';
  @Input() public buttonText: string = 'Placeholder';
  @Input() public icon: string = 'sb-trashcan';
  @Input() public type: string = 'warn';
  @Output() public buttonPushEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public ngOnInit() {
  }

  public onClick() {
    this.buttonPushEmitter.emit();
  }

}
