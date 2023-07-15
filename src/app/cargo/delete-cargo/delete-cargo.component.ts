import { Component, OnInit } from '@angular/core';
import { Cargo } from '../cargo';
import { CargoService } from '../cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-cargo',
  templateUrl: './delete-cargo.component.html',
  styleUrls: ['./delete-cargo.component.css'],
  providers: [NgbCarouselConfig]
})
export class DeleteCargoComponent implements OnInit {
  form:any={};
  error = false;
  errorMessage = '';
  cargo: Cargo;
  photos: Blob[];
  first = true;

  constructor(private cargoService:CargoService, private route: ActivatedRoute, private router: Router,private config: NgbCarouselConfig){
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params=> this.getCargo(params['id']))  
  }

  getCargo(id:number){
    this.cargoService.deleteCargoGet(id).subscribe(
      (response:Cargo) => {
        this.cargo = response;      
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
    this.error = false;
    this.errorMessage = '';
  }

  onSubmit(){
    this.cargoService.deleteCargo(this.cargo.id!).subscribe(
      (response:any) => {
        this.resetError();

        this.router.navigate(["cargo/all"]);
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }
}
