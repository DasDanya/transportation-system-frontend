import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/address/address';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Responsible } from 'src/app/responsible/responsible';
declare var $: any;

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {

  form:any={};
  errorMessage = '';
  error = false;
  responsibles:Responsible[];


  constructor(private warehouseService: WarehouseService, private router: Router){}

  
  ngOnInit(): void {  

    this.getResponsibles();
    this.searchResponsible();
  }

  getResponsibles(){
    this.warehouseService.addWarehouseGet().subscribe(
      (responsibles : Responsible[]) =>{
        this.resetError();

        this.responsibles = responsibles;
      },
      (error: HttpErrorResponse) =>{
        this.setError(error);
      }
    )
  }

  searchResponsible(){
    $(document).ready(function() {
      $("#responsible").select2();
     });
  }

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.error = false;
    this.errorMessage = '';
  }

  onSubmit(){
    let address = new Address(
      this.form.state,
      this.form.city,
      this.form.street,
      this.form.house
    );

    let selectedResponsible = this.responsibles.find(r=> r.id == this.form.responsible);

    let warehouse = new Warehouse(address,selectedResponsible);

    this.warehouseService.addWarehouse(warehouse).subscribe(
      (data : any) =>{
        this.resetError();
        
        this.router.navigate(["warehouse/all"]);
      },
      (error: HttpErrorResponse) =>{
        this.setError(error);
      }
    )
  }
}
