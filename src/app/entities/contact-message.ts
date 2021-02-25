import {ContactTopic} from './contact-topic';

export class ContactMessage {

  id: number;
  email: string;
  topic: string;
  message: string;
  dateCreated: Date;
  isRead: boolean;
}
