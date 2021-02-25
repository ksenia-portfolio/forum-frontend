import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { ForumComponent } from './forum/forum.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { ForumToolsComponent } from './forum-tools/forum-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegistrationComponent,
    ForumComponent,
    ContactUsComponent,
    BadRequestComponent,
    CreateNewPostComponent,
    ForumToolsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
