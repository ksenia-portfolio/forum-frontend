import { Component, OnInit } from '@angular/core';
import {ContactFormService} from '../services/contact-form.service';
import {ContactTopic} from '../entities/contact-topic';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContactMessage} from '../entities/contact-message';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  topics: ContactTopic[];
  contactForm: FormGroup;
  messageSent: boolean;
  contactMessage: ContactMessage = new ContactMessage();

  constructor(private contactFormService: ContactFormService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadTopics();
    this.loadContactForm();
  }

  loadTopics(): void{
    this.contactFormService.getAllTopics().subscribe(data => {
      this.topics = data;
      console.log(data);
    }, error => console.log(error));
  }

  private loadContactForm(): void{
    this.contactForm = this.formBuilder.group(
      {
        emailControl: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
        topicControl: new FormControl('', Validators.required),
        messageControl: new FormControl('', Validators.required)
      }
    );
  }

  // tslint:disable-next-line:typedef
  get formControls(){
    return this.contactForm.controls;
  }

  signIn(): void{
    this.router.navigate(['sign-in']);
  }

  register(): void{
    this.router.navigate(['registration']);
  }

  onSubmit(): void {
    this.contactFormService.sendContactForm(this.contactMessage).subscribe (data => {
      console.log(data);
      this.messageSent = true;
      this.contactForm.reset();
    });
  }
}
