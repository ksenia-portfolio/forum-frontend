import { Component, OnInit } from '@angular/core';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email = '';
  password = '';
  signInFail: boolean;
  signInForm: FormGroup;

  constructor(private accountService: AccountService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadSignInForm();
    if(this.localStorageService.isSignedIn()){
      this.router.navigate(['forum/view-posts/all-posts']);
    }
  }

  private loadSignInForm(): void{
    this.signInForm = this.formBuilder.group(
      {
        emailControl: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
        passwordControl: new FormControl('', Validators.required)
      }
    );
  }

  get formControls(){
    return this.signInForm.controls;
  }

  onSubmit(): void {
    this.accountService.signIn(this.email, this.password).subscribe (data => {
        this.localStorageService.setAuthorisedEmail(this.email);
        this.router.navigate(['forum/view-posts', 'all-posts']);
        console.log('Access granted to ' + this.email);
      }, error => {console.log('Could not sign in');
                   this.signInFail = true;
                   this.signInForm.reset();
    }
      );
    }

  register(): void{
    this.router.navigate(['registration']);
  }

  contactUs(): void{
    this.router.navigate(['contact-us']);
  }


}
