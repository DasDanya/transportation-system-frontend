import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {AddResponsibleComponent} from './responsible/add-responsible/add-responsible.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
      path: 'auth/signin',
      component: SigninComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path:'responsible/add',
    component: AddResponsibleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
