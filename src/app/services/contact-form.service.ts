import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContactTopic} from '../entities/contact-topic';
import {ContactMessage} from '../entities/contact-message';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  private topicUrl = 'http://localhost:8080/v1/api/contact-topics';
  private messageUrl = 'http://localhost:8080/v1/api/contact-messages';

  constructor(private http: HttpClient) { }

  getAllTopics(): Observable<ContactTopic[]>{
    return this.http.get<ContactTopic[]>(`${this.topicUrl}`);
  }

  sendContactForm(contactForm: ContactMessage): Observable<any>{
    return this.http.post(`${this.messageUrl}`, contactForm);
  }
}
