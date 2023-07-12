import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../warehouse.service';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouse';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(private warehouseService: WarehouseService, private router:Router){}


  ngOnInit(): void {
      this.getWarehouses();
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

  }


}
