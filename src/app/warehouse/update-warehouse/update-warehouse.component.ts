import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../warehouse';
import { WarehouseService } from '../warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Responsible } from 'src/app/responsible/responsible';
import { WarehouseWithResponsibles } from '../warehouseWithResponsibles';
import { Address } from 'src/app/address/address';

declare var $: any;

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})

export class UpdateWarehouseComponent implements OnInit {

  form:any={};
  errorMessage = '';
  error = false;
  warehouse:Warehouse;
  responsibles:Responsible[];

  constructor(private warehouseService: WarehouseService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      this.route.params.subscribe(params=> this.setStartData(params['id']))
      this.searchResponsible();
  }

  setStartData(id:number){
    this.warehouseService.updateWarehouseGet(id).subscribe(
      (response:WarehouseWithResponsibles) => {
        this.responsibles = response.responsibles;
        this.warehouse = response.warehouse;

        this.setValueInputs();
        this.resetError();

      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }


  private setValueInputs():void{
    this.form.state = this.warehouse.address.state;
    this.form.city = this.warehouse.address.city;
    this.form.street = this.warehouse.address.street;
    this.form.house = this.warehouse.address.house;
    this.form.responsible = this.warehouse.responsible.id;
  }

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.error = false;
    this.errorMessage = '';
  }

  searchResponsible(){
    $(document).ready(function() {
      $("#responsible").select2();
     });
  }

  onSubmit(){
    let address = new Address(
      this.form.state,
      this.form.city,
      this.form.street,
      this.form.house,
      this.warehouse.address.id
    );

    let selectedResponsible = this.responsibles.find(r=> r.id == this.form.responsible);

    let warehouse = new Warehouse(address,selectedResponsible,this.warehouse.id);

    this.warehouseService.updateWarehouse(warehouse).subscribe(
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
