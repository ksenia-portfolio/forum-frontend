import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private router: Router) { }


  setAuthorisedEmail(email: string): void{
    localStorage.setItem('email', email);
  }

  getAuthorisedEmail(): string{
    return localStorage.getItem('email');
  }
  clearAuthorisedEmail(): void{
    localStorage.setItem('email', '');
  }
  removeAllData(): void{
    localStorage.clear();
  }
  isEmpty(): boolean{
    return localStorage.length === 0;
  }

  isSignedIn(): boolean{
    return !this.isEmpty() && this.getAuthorisedEmail().length > 0;
  }

  refresh(goToUrl: string): void{
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([goToUrl]);
    });
  }

}
