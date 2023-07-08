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
        
        this.errorMessage = '';
        this.receivingError = false;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.receivingError = true;
      }
    )
  }
}
