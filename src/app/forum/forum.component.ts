import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AccountService} from '../services/account.service';
import {ForumService} from '../services/forum.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ForumMessage} from '../entities/forum-message';
import {ForumTopic} from '../entities/forum-topic';
import {ForumResponse} from '../entities/forum-response';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  discussions: ForumMessage [] = [];
  responses: ForumResponse [] = [];
  topics: ForumTopic[] = [];
  request: string;
  requestFail = false;


  constructor(private accountService: AccountService,
              private localStorageService: LocalStorageService,
              private forumService: ForumService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // subscribe to the route
    this.route.paramMap.subscribe(() => {
      // load discussions by the route request or report fail
      this.loadDiscussions();
    });
  }

  private loadDiscussions(): void {
    // snapshot param from the route
    this.request = this.route.snapshot.paramMap.get('request');
    console.log(this.request);
    // load posts by Topic or by existing request
    this.loadPostsByTopic(this.request);

  }

  private loadPostsByTopic(str: string): void {
    this.forumService.getMessagesByTopic(this.request).subscribe(data => {
      this.discussions = data;
      if(data.length === 0){
        switch (str.toLowerCase()) {
          case 'my-posts':
            this.loadMyPosts();
            break;
          case 'my-responses':
            this.loadMyResponses();
            break;
          case 'all-posts':
            this.loadAllPosts();
            break;
          default:
            this.requestFail = true;
        }
      }
    }, error => {
      console.log('Could not load any messages by request');

    });
  }


  private isNumber(str: string): boolean {
    console.log(str + ' is a number - ' + /^\d+$/.test(str));
    return /^\d+$/.test(str);
  }

  private loadAllPosts(): void {
    this.forumService.getAllMessages().subscribe(data => {
      this.discussions = data;
    }, error => {
      console.log('Could not load all messages');
    });
  }

  private loadMyPosts(): void {
    this.forumService.getMessagesByEmail(this.localStorageService.getAuthorisedEmail()).subscribe(data => {
      this.discussions = data;
    }, error => {
      console.log('Could not load posts by current email');
    });
  }

  private loadMyResponses(): void {
    this.forumService.getResponsesByEmail(this.localStorageService.getAuthorisedEmail()).subscribe(data => {
      this.responses = data;
    }, error => console.log('Could not load responses by current email'));
  }
}
