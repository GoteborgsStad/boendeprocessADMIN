import { Component, Input, OnInit } from '@angular/core';
import { User } from './../../../../../_models/user/user.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
})
export class ContactCardComponent implements OnInit {

  @Input() public contact: User;
  constructor() { }

  public ngOnInit() {  }

  public stopBubble($event: Event) {
    $event.cancelBubble = true;
  }

}
