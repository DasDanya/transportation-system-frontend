import { Component, OnInit } from '@angular/core';
import { Responsible } from '../responsible';
import { ResponsibleService } from '../responsible.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-responsible',
  templateUrl: './delete-responsible.component.html',
  styleUrls: ['./delete-responsible.component.css']
})
export class DeleteResponsibleComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  error = false;
  responsible:Responsible;

  constructor(private responsibleService: ResponsibleService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params=> this.getResponsible(params['id']))
  }
  
  getResponsible(id:number){
    this.responsibleService.deleteResponsibleGet(id).subscribe(
      (response:Responsible) => {
        this.responsible = response;
    
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  onSubmit(id:number){
    this.responsibleService.deleteResponsible(id).subscribe(
      (response:Responsible) => {
        this.resetError();

        this.router.navigate(["responsible/all"]);
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

}
