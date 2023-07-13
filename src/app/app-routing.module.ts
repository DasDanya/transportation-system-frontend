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
import { DeleteWarehouseComponent } from './warehouse/delete-warehouse/delete-warehouse.component';
import { UpdateWarehouseComponent } from './warehouse/update-warehouse/update-warehouse.component';
import { ExcelResponsibleComponent } from './responsible/excel-responsible/excel-responsible.component';

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
    path: 'responsible/excel/:id',
    component: ExcelResponsibleComponent
  },
  {
    path: 'warehouse/add',
    component: AddWarehouseComponent
  },
  {
    path: 'warehouse/all',
    component: AllWarehouseComponent
  },
  {
    path: 'warehouse/delete/:id',
    component: DeleteWarehouseComponent
  },
  {
    path: 'warehouse/update/:id',
    component: UpdateWarehouseComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
