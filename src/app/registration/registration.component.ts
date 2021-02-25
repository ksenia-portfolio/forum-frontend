import { Component, OnInit } from '@angular/core';
import {Account} from '../entities/account';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {FormValidator} from '../validators/form-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  tempAccount = new Account();
  confirmPassword = '';
  registrationFailed: boolean;

  registrationForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadRegistrationForm();
  }

  private loadRegistrationForm(): void{
    this.registrationForm = this.formBuilder.group(
      {
        nameControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
        emailControl: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
        passwordControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPasswordControl: new FormControl('', Validators.required)
      },
      {
        validator: FormValidator.matchingPassword('passwordControl', 'confirmPasswordControl')
      }
    );
  }

  get formControls(){
    return this.registrationForm.controls;
  }

  signIn(): void{
    this.router.navigate(['sign-in']);
  }

  onSubmit(): void {
    this.accountService.register(this.tempAccount).subscribe (data => {
      console.log(data);
      this.registrationFailed = false;
      this.registrationForm.reset();
    }, error => console.log(error));
    this.registrationFailed = true;
  }
}
