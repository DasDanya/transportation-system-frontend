import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../warehouse.service';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouse';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-all-warehouse',
  templateUrl: './all-warehouse.component.html',
  styleUrls: ['./all-warehouse.component.css']
})
export class AllWarehouseComponent implements OnInit {

  form:any={};
  receivingError = false;
  errorMessage = '';
  warehouses: Warehouse[];
  userRoles:string[];

  constructor(private warehouseService: WarehouseService,private tokenStorage:TokenStorageService){}


  ngOnInit(): void {
      this.accessVerification();
      this.getWarehouses();
  }

  private accessVerification(){
    this.userRoles = this.tokenStorage.getAuthorities();
    
    if(this.userRoles.length == 0){
      this.errorMessage = "Доступ к запрошенному ресурсу запрещен";
      this.receivingError = true;
    }
  }

  getWarehouses():void{
    this.warehouseService.getWarehouses().subscribe(
      (response: Warehouse[]) =>{
        this.warehouses = response;
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.receivingError = true;
  }

  private resetError(){
    this.receivingError = false;
    this.errorMessage = '';
  }

  searchWarehouses(){
    this.warehouseService.searchWarehouses(this.form.field,this.form.searchValue).subscribe(
      (response: Warehouse[]) =>{
        this.warehouses = response;
        
       this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }


}
