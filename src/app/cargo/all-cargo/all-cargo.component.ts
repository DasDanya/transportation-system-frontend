import { Component, OnInit } from '@angular/core';
import { CargoService } from '../cargo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-all-cargo',
  templateUrl: './all-cargo.component.html',
  styleUrls: ['./all-cargo.component.css']
})
export class AllCargoComponent implements OnInit {

  form:any={};
  error = false;
  errorMessage = '';
  cargos: Cargo[];

  constructor(private cargoService:CargoService){}

  ngOnInit(): void {
    this.getCargos();
  }

  getCargos(){
    this.cargoService.getCargos().subscribe(
      (response: Cargo[]) =>{

        this.cargos = response;
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }


  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.errorMessage = '';
    this.error = false;
  }

  searchCargos(){  
    this.cargoService.searchCargos(this.form.field, this.form.searchValue,this.form.conditional).subscribe(
      (response: Cargo[]) =>{
        this.cargos = response;
        
       this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  onChangedField(event:any){
    let fieldValue = event.target.value;

    let div = document.getElementById('conditional');
    if(fieldValue === 'cost' || fieldValue === 'count'){
      div!.style.display = "block";
      div!.style.marginTop = "10px";

      this.form.conditional = "equals";
    }else{
      div!.style.display = "none";
    }
  }
}
