import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Account} from '../entities/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/v1/api/forum/accounts';

  constructor(private http: HttpClient) { }

  getAccountByEmail(email: string): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/email/${email}`);
  }

  signIn(email: string, password: string): Observable<Account>{
    return this.http.post<any>(`${this.baseUrl}/authorisation`, {email, password});
  }

  register(account: Account): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/register-user`, account);
  }

}
