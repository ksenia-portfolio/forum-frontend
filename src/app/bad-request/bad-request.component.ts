import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-bad-request',
  templateUrl: './bad-request.component.html',
  styleUrls: ['./bad-request.component.css']
})
export class BadRequestComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  goToForum(): void{
    if(this.localStorageService.isSignedIn()){
        this.router.navigate(['forum/view-posts/all-posts']);
    }else{
      this.router.navigate(['sign-in']);
    }
  }
}
