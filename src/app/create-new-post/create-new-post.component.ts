import { Component, OnInit } from '@angular/core';
import {ContactTopic} from '../entities/contact-topic';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ForumService} from '../services/forum.service';
import {ForumMessage} from '../entities/forum-message';
import {AccountService} from '../services/account.service';
import {Account} from '../entities/account';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrls: ['./create-new-post.component.css']
})
export class CreateNewPostComponent implements OnInit {

  account: Account = new Account();
  topics: ContactTopic[];
  postForm: FormGroup;
  postBody: ForumMessage = new ForumMessage();
  closeWind: boolean;
  signedIn: boolean;

  constructor(private forumService: ForumService,
              private accountService: AccountService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.localStorageService.isSignedIn()){
      this.signedIn = true;
      this.loadAccount();
      this.loadTopics();
      this.loadPostForm();
    }else{
      this.router.navigate(['bad-request']);
    }
  }

  private loadAccount(): void{
    this.accountService.getAccountByEmail(this.localStorageService.getAuthorisedEmail()).subscribe(data => {
      this.account = data;
      console.log(data);
    }, error => console.log('Could not load account')
    );
  }

  private loadTopics(): void{
    this.forumService.getAllTopics().subscribe(data => {
      this.topics = data;
      console.log(data);
    }, error => console.log('Could not load topics')
    );
  }

  private loadPostForm(): void{
    this.postForm = this.formBuilder.group(
      {
        topicControl: new FormControl('', Validators.required),
        messageControl: new FormControl('', Validators.required)
      }
    );
  }

  // tslint:disable-next-line:typedef
  get formControls(){
    return this.postForm.controls;
  }

  onSubmit(): void {
    this.postBody.email = this.account.email;
    this.postBody.name = this.account.name;
    this.forumService.createPost(this.postBody).subscribe (data => {
      this.router.navigate(['sign-in']);
    }, error => console.log('Could not submit the form')
    );
  }


  public dismiss(): void{
    this.router.navigate(['sign-in']);
  }
}

