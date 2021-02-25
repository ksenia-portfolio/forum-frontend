import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ForumMessage} from '../entities/forum-message';
import {ForumResponse} from '../entities/forum-response';
import {ForumTopic} from '../entities/forum-topic';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private forumMessagesUrl = 'http://localhost:8080/v1/api/forum/messages';
  private forumResponsesUrl = 'http://localhost:8080/v1/api/forum/responses';
  private forumTopicsUrl = 'http://localhost:8080/v1/api/forum/topics';

  constructor(private http: HttpClient,
              @Inject(DOCUMENT)private document: Document) { }

  getAllMessages(): Observable<ForumMessage[]>{
    return this.http.get<ForumMessage[]>(`${this.forumMessagesUrl}`);
  }

  getMessagesByEmail(email: string): Observable<ForumMessage[]>{
    return this.http.get<ForumMessage[]>(`${this.forumMessagesUrl}/email/${email}`);
  }

  getMessagesByTopic(topic: string): Observable<ForumMessage[]>{
    return this.http.get<ForumMessage[]>(`${this.forumMessagesUrl}/topic/${topic}`);
  }

  getResponsesByEmail(email: string): Observable<ForumResponse[]>{
    return this.http.get<ForumResponse[]>(`${this.forumResponsesUrl}/email/${email}`);
  }

  getAllTopics(): Observable<ForumTopic[]>{
    return this.http.get<ForumTopic[]>(`${this.forumTopicsUrl}`);
  }
  createPost(post: ForumMessage): Observable<any>{
    return this.http.post<any>(`${this.forumMessagesUrl}`, post);
  }
  refresh(): void{
    this.document.location.reload();
  }

}
