import { User } from '../user/user.model';
import { ChatMessage } from './chat-messages.model';

export class Chat {
  public id: number;
  public name: string;
  public description: string;
  public created_at: string;
  public updated_at: string;
  public chat_messages: ChatMessage[];
  public users: User[];
}
