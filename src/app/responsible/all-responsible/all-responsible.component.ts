import { Component, OnInit } from '@angular/core';
import { Responsible } from '../responsible';
import { ResponsibleService } from '../responsible.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-all-responsible',
  templateUrl: './all-responsible.component.html',
  styleUrls: ['./all-responsible.component.css']
})
export class AllResponsibleComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  receivingError = false;
  responsibles: Responsible[];
  userRoles:string[];

  constructor(private responsibleService: ResponsibleService,private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
    this.accessVerification();
    this.getResponsibles();
  }

  getResponsibles(): void{
    this.responsibleService.getResponsibles().subscribe(
      (response: Responsible[]) =>{
        this.responsibles = response;
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  searchResponsibles(): void{
    this.responsibleService.searchResponsibles(this.form.field,this.form.searchValue).subscribe(
      (response: Responsible[]) =>{
        this.responsibles = response;
        
       this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  private accessVerification(){
    this.userRoles = this.tokenStorage.getAuthorities();
    
    if(this.userRoles.length == 0){
      this.errorMessage = "Доступ к запрошенному ресурсу запрещен";
      this.receivingError = true;
    }
  }

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.receivingError = true;
  }

  private resetError(){
    this.receivingError = false;
    this.errorMessage = '';
  }
}
