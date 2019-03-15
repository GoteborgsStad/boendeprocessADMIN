import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Cookie } from 'ng2-cookies';

import { ChatMessage } from '../../../../../_models/chat/chat-messages.model';
import { Chat } from '../../../../../_models/chat/chat.model';

import { ChatService } from '../../../../../_services/chat.service';

@Component({
  selector: 'app-add-chat-message-form',
  templateUrl: './add-chat-message-form.component.html',
})
export class AddChatMessageFormComponent implements OnInit {
  @Input() public chat: Chat;
  @Output() public getChatMessage: EventEmitter<ChatMessage> = new EventEmitter<ChatMessage>();
  public addChatMessageForm: FormGroup;

  // tslint:disable-next-line
  private submitted = false;

  constructor(
    private _snackbar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _chatService: ChatService,
  ) { }

  public ngOnInit() {
    this.addChatMessageForm = this._formBuilder.group({
      chatMessage: ['', Validators],
      isActiveEnter: [(Cookie.get('remember_enter') === 'true') ? true : false, Validators],
    });
  }

  public addChatMessage({ value, valid }) {
    this.submitted = true;

    if (value.chatMessage === '') {
      this._snackbar.open('Ditt meddelande får inte vara tomt.', undefined, {
        duration: 5000,
        extraClasses: ['bg-aska'],
      });

      return;
    }

    this._chatService.postChatMessage(this.chat.id, {
      body: value.chatMessage,
    }).subscribe(
      (res) => {
        this.getChatMessage.emit(res);

        this.addChatMessageForm.patchValue({
          chatMessage: '',
        });
      },
      (err) => {
        // Error
      },
      () => {
        // Done
      },
    );
  }

  public enter(event) {
    if (event.keyCode === 13 && this.addChatMessageForm.value.isActiveEnter) {
      this.addChatMessage(this.addChatMessageForm);
    }
  }

  public rememberEnter() {
    if (this.addChatMessageForm.value.isActiveEnter) {
      Cookie.delete('remember_enter');
      Cookie.set('remember_enter', 'false', undefined, '/');
    } else {
      Cookie.delete('remember_enter');
      Cookie.set('remember_enter', 'true', undefined, '/');
    }
  }
}
