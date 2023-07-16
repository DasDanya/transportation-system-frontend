import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Warehouse } from 'src/app/warehouse/warehouse';
import { CargoService } from '../cargo.service';
import { Cargo } from '../cargo';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
declare var $: any;

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.css']
})
export class AddCargoComponent {

  form:any={};
  error = false;
  errorMessage = '';
  warehouses: Warehouse[];
  selectedFiles: File[];
  private maxCountFiles = 5;

  categories=[
    'Антисанитарный', 'Длинномерный', 'Живой', 'Негабаритный', 'Обычный', 'Опасный', 'Скоропортящийся', 'Тяжеловесный'
  ];

  constructor(private cargoService: CargoService, private router: Router,private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
      this.accessVerification();
      this.getStartData();
  }

  accessVerification(){
    let userRoles = this.tokenStorage.getAuthorities();

    if(userRoles.indexOf('ROLE_ADMIN') !== -1 || userRoles.indexOf('ROLE_MODERATOR') !== -1){
      this.error = false;
      this.errorMessage = '';
    }else{
      this.errorMessage = "Доступ к запрошенному ресурсу запрещен";
      this.error =  true;
    }
  }

  getStartData(){
    this.cargoService.getAddCargo().subscribe(
      (response:Warehouse[])=>{
        this.resetError();

        this.warehouses = response;
      },
      (error:HttpErrorResponse)=>{
        this.setError(error);
      }
    )
  }

  onFilesChanged(event:any){
    this.selectedFiles = event.target.files;
  }

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.errorMessage = '';
    this.error = false;
  }

  onSubmit(){

    if(this.form.startWarehouse === this.form.endWarehouse){
      alert("Стартовый и конечный склады должны отличаться");
    }else{
      if(this.selectedFiles.length > this.maxCountFiles){
        alert(`Нельзя загружать более ${this.maxCountFiles} фотографий`);
      }else{
        let cost = (Math.round(this.form.cost * 100)/100);

        let startWarehouse = this.warehouses.find(w=> w.id == this.form.startWarehouse);
        let endWarehouse = this.warehouses.find(w=> w.id == this.form.endWarehouse);

        let cargo = new Cargo(
          this.form.name,
          this.form.category,
          cost,
          this.form.count,
          startWarehouse,
          endWarehouse,
          startWarehouse
        );

        //alert(`start:${startWarehouse?.id} actual:${actualWarehouse?.id} end:${endWarehouse?.id}`);
        const cargoWithPhotos = new FormData();
        const cargoBlob = new Blob([JSON.stringify(cargo)], {type: "application/json"});
        cargoWithPhotos.append('cargo',cargoBlob);
        Array.from(this.selectedFiles).forEach((f) => cargoWithPhotos.append('photos',f));

        this.cargoService.addCargo(cargoWithPhotos).subscribe(
          (response:any)=>{
            this.resetError();       
            this.router.navigate(["cargo/all"]);
          },
          (error:HttpErrorResponse)=>{
            this.setError(error);
          }
        )
      }
    }
  }
}
