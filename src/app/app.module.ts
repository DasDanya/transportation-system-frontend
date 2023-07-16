import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AddResponsibleComponent } from './responsible/add-responsible/add-responsible.component';
import { AllResponsibleComponent } from './responsible/all-responsible/all-responsible.component';
import { DeleteResponsibleComponent } from './responsible/delete-responsible/delete-responsible.component';
import { UpdateResponsibleComponent } from './responsible/update-responsible/update-responsible.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { AllWarehouseComponent } from './warehouse/all-warehouse/all-warehouse.component';
import { DeleteWarehouseComponent } from './warehouse/delete-warehouse/delete-warehouse.component';
import { UpdateWarehouseComponent } from './warehouse/update-warehouse/update-warehouse.component';
import { ExcelResponsibleComponent } from './responsible/excel-responsible/excel-responsible.component';
import { AddCargoComponent } from './cargo/add-cargo/add-cargo.component';
import { AllCargoComponent } from './cargo/all-cargo/all-cargo.component';
import { DeleteCargoComponent } from './cargo/delete-cargo/delete-cargo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCargoComponent } from './cargo/update-cargo/update-cargo.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    SignupComponent,
    AddResponsibleComponent,
    AllResponsibleComponent,
    DeleteResponsibleComponent,
    UpdateResponsibleComponent,
    AddWarehouseComponent,
    AllWarehouseComponent,
    DeleteWarehouseComponent,
    UpdateWarehouseComponent,
    ExcelResponsibleComponent,
    AddCargoComponent,
    AllCargoComponent,
    DeleteCargoComponent,
    UpdateCargoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
