import { Component, OnInit } from '@angular/core';
import { Cargo } from '../cargo';
import { CargoService } from '../cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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

  constructor(private cargoService:CargoService, private route: ActivatedRoute, private router: Router,private tokenStorage:TokenStorageService,private config: NgbCarouselConfig){
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }


  ngOnInit(): void {
    this.accessVerification();
    this.route.params.subscribe(params=> this.getCargo(params['id']))  
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
