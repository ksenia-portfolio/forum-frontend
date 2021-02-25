import {ForumMessage} from './forum-message';
import {Account} from './account';

export class ForumResponse {
  id: number;
  message: ForumMessage;
  account: Account;
  text: string;
  rating: number;
  dateCreated: Date;
}
