import { User } from '../user/user.model';
import { ChatMessageStatus } from './chat-message-status.model';

export class ChatMessage {
  public id: number;
  public body: string;
  public user: User;
  public created_at: string;
  public updated_at: string;
  public chat_message_status: ChatMessageStatus;
}
