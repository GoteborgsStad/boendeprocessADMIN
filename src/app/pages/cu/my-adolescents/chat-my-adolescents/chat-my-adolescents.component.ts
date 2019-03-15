import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../_services/user.service';

import { ChatMessage } from '../../../../_models/chat/chat-messages.model';
import { Chat } from '../../../../_models/chat/chat.model';
import { User } from '../../../../_models/user/user.model';

@Component({
  selector: 'app-chat-my-adolescents',
  templateUrl: 'chat-my-adolescents.component.html',
})

export class ChatMyAdolescentsComponent implements OnInit {
  public contact: User;
  public adolescent: User;
  public chat: Chat;
  private fetchChat: any;
  private checkChatMessagesAmount: number = 0;
  private delay: number = 10000; // 10 seconds

  constructor(
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) { }

  public ngOnInit() {
    this._route.params.subscribe(
      (parameters) => {
        this.fetchChat = this._userService.getChat(parameters.id).repeatWhen(
          (attempt) => {
            return attempt.delay(this.delay);
          },
        ).subscribe(
          (res) => {
            if (
              (this.chat === undefined) ||
              (this.chat !== undefined && this.checkChatMessagesAmount < res.chat_messages.length)
            ) {
              this.chat = res;
              this._cdr.detectChanges();
              this.checkChatMessagesAmount = this.chat.chat_messages.length;
            }

            for (const user of this.chat.users) {
              if (user.user_role.name === 'CU') {
                this.contact = user;
              } else if (user.user_role.name === 'AU') {
                this.adolescent = user;
              }
            }
          },
          (err) => {
            // Error
          },
          () => {
            // Done
          },
        );
      },
    );
  }

  public ngOnDestroy() {
    this.fetchChat.unsubscribe();
  }

  public getChatMessage(value: ChatMessage) {
    value.user.user_role = this.contact.user_role;

    this.chat.chat_messages.push(value);
    this.checkChatMessagesAmount = this.chat.chat_messages.length - 1;
  }
}
