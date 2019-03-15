import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class ChatService {

  constructor(
    private apiService: ApiService,
  ) { }

  public postChatMessage(id: number, value: object) {
    return this.apiService.API('POST', `/v1/cu/chats/${id}/chatmessages`, value);
  }
}
