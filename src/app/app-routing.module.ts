import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {AddResponsibleComponent} from './responsible/add-responsible/add-responsible.component';
import { AllResponsibleComponent } from './responsible/all-responsible/all-responsible.component';
import { DeleteResponsibleComponent } from './responsible/delete-responsible/delete-responsible.component';
import { UpdateResponsibleComponent } from './responsible/update-responsible/update-responsible.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { AllWarehouseComponent } from './warehouse/all-warehouse/all-warehouse.component';

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
  },
  {
    path: 'responsible/all',
    component: AllResponsibleComponent
  },
  {
    path: 'responsible/delete/:id',
    component: DeleteResponsibleComponent
  },
  {
    path: 'responsible/update/:id',
    component: UpdateResponsibleComponent
  },
  {
    path: 'warehouse/add',
    component: AddWarehouseComponent
  },
  {
    path: 'warehouse/all',
    component: AllWarehouseComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
