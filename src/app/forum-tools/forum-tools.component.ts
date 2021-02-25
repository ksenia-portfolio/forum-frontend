import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute, Route, Router, Routes} from '@angular/router';
import {ForumService} from '../services/forum.service';

@Component({
  selector: 'app-forum-tools',
  templateUrl: './forum-tools.component.html',
  styleUrls: ['./forum-tools.component.css']
})
export class ForumToolsComponent implements OnInit {

  accountDropdown: string [][];
  discussions: string [][] = [];
  private forumURl = 'forum/view-posts/';

  constructor(private localStorageService: LocalStorageService,
              private forumService: ForumService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  private loadMenu(): void {
    if (this.localStorageService.isSignedIn()) {
      this.accountDropdown = [['edit profile', 'edit-profile'],
                              ['sign out', '']];

      this.discussions = [['create post', 'forum/create-post'],
                       ['my posts', this.forumURl + 'my-posts'],
                       ['my responses', this.forumURl + 'my-responses']];

    }else {
      this.accountDropdown = [['register', 'registration'], ['sign in', 'sign-in']];
      this.discussions = [];
    }
    if (this.discussions.length <= 3){
      this.forumService.getAllTopics().subscribe(data => {
      for (const topic of data){
        this.discussions.push([topic.name, this.forumURl + topic.name]);
      }
    });
    }
  }


  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
    this.ngOnInit();
  }

  navigateTo(url: string): void {
    if (url === '') {
      this.localStorageService.removeAllData();
      this.reloadComponent();
    }
    this.router.navigate([url]);
    this.ngOnInit();
  }

}
