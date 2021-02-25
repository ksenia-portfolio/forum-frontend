import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForumComponent} from './forum/forum.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {BadRequestComponent} from './bad-request/bad-request.component';
import {CreateNewPostComponent} from './create-new-post/create-new-post.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'forum/view-posts/:request', component: ForumComponent},
  {path: 'forum/create-post', component: CreateNewPostComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'bad-request', component: BadRequestComponent},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {path: '**', component: BadRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
