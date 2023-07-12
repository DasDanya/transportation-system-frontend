import { Component, OnInit } from '@angular/core';
import { Responsible } from '../responsible';
import { ResponsibleService } from '../responsible.service';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(private responsibleService: ResponsibleService){}

  ngOnInit(): void {
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

  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.receivingError = true;
  }

  private resetError(){
    this.receivingError = false;
    this.errorMessage = '';
  }
}
