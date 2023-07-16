import { Component, OnInit } from '@angular/core';
import { Cargo } from '../cargo';
import { CargoService } from '../cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { CargoWithWarehouses } from '../cargoWithWarehouses';
import { Warehouse } from 'src/app/warehouse/warehouse';

@Component({
  selector: 'app-update-cargo',
  templateUrl: './update-cargo.component.html',
  styleUrls: ['./update-cargo.component.css']
})
export class UpdateCargoComponent implements OnInit {

  form:any={};
  error = false;
  errorMessage = '';
  cargo:Cargo;
  warehouses: Warehouse[];
  selectedFiles: File[];
  private maxCountFiles = 5;

  categories=[
    'Антисанитарный', 'Длинномерный', 'Живой', 'Негабаритный', 'Обычный', 'Опасный', 'Скоропортящийся', 'Тяжеловесный'
  ];

  constructor(private cargoService: CargoService, private route: ActivatedRoute, private router: Router, private config: NgbCarouselConfig){
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=> this.getStartData(params['id']))
  }


  getStartData(id:number){
    this.cargoService.updateCargoGet(id).subscribe(
      (response:CargoWithWarehouses) => {
        this.cargo = response.cargo;
        this.warehouses = response.warehouses;

        this.setValueInputs();
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  private setValueInputs():void{
    this.form.name = this.cargo.name;
    this.form.category = this.cargo.category;
    this.form.cost = this.cargo.cost;
    this.form.count = this.cargo.count;
    this.form.startWarehouse = this.cargo.startWarehouse?.id;
    this.form.endWarehouse =this.cargo.endWarehouse?.id;
    if(this.cargo.actualWarehouse != null){
      this.form.actualWarehouse = this.cargo.actualWarehouse?.id;
    } else{
        this.form.actualWarehouse = "none";
      }
  }


  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.error = false;
    this.errorMessage = '';
  }

  onFilesChanged(event:any){
    this.selectedFiles = event.target.files;
  }

  onSubmit(){
    if(this.form.startWarehouse === this.form.endWarehouse){
      alert("Стартовый и конечный склады должны отличаться");
    }else{
      if(this.selectedFiles != null && this.selectedFiles.length > this.maxCountFiles){
        alert(`Нельзя загружать более ${this.maxCountFiles} фотографий`);
      }else{
        let cost = (Math.round(this.form.cost * 100)/100);

        let startWarehouse = this.warehouses.find(w=> w.id == this.form.startWarehouse);
        let endWarehouse = this.warehouses.find(w=> w.id == this.form.endWarehouse);

        let actualWarehouse = undefined;
        if(this.form.actualWarehouse != "none"){
          actualWarehouse = this.warehouses.find(w=> w.id == this.form.actualWarehouse);
        }

        let cargo = new Cargo(
          this.form.name,
          this.form.category,
          cost,
          this.form.count,
          startWarehouse,
          endWarehouse,
          actualWarehouse,
          this.cargo.id
        );

        const cargoWithPhotos = new FormData();
        const cargoBlob = new Blob([JSON.stringify(cargo)], {type: "application/json"});
        cargoWithPhotos.append('cargo',cargoBlob);

        const file = document.getElementById('photos') as HTMLInputElement;

        if(this.selectedFiles != null){
          Array.from(this.selectedFiles).forEach((f) => cargoWithPhotos.append('photos',f));
        }


        this.cargoService.updateCargo(cargoWithPhotos).subscribe(
          (data : any) =>{
            this.resetError();  
            this.router.navigate(["cargo/all"]);
          },
          (error: HttpErrorResponse) =>{
            this.setError(error);
          }
        )
      }
    }
  }
}
