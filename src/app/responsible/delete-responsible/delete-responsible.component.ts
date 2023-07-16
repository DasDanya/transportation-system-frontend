import { Component, OnInit } from '@angular/core';
import { Responsible } from '../responsible';
import { ResponsibleService } from '../responsible.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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
  constructor(private responsibleService: ResponsibleService, private route: ActivatedRoute, private router: Router, private tokenStorage:TokenStorageService){}

  ngOnInit(): void {
    this.accessVerification();
    this.route.params.subscribe(params=> this.getResponsible(params['id']))
  }
  
  private accessVerification(){
    let userRoles = this.tokenStorage.getAuthorities();

    if(userRoles.indexOf('ROLE_ADMIN') !== -1){
      this.error = false;
      this.errorMessage = '';
    }else{
      this.errorMessage = "Доступ к запрошенному ресурсу запрещен";
      this.error =  true;
    }
  }

  getResponsible(id:number){
    this.responsibleService.deleteResponsibleGet(id).subscribe(
      (response:Responsible) => {
        this.responsible = response;
        this.resetError();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.error = true;
      }
    )
  }

  onSubmit(){
    this.responsibleService.deleteResponsible(this.responsible.id).subscribe(
      (response:any) => {
        this.resetError();

        this.router.navigate(["responsible/all"]);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "Ошибка удаления ответственного. Причиной ошибки может стать удаление ответственного, который связан со складом";
        this.error = true;
      }
    )
  }

  

  private resetError(){
    this.error = false;
    this.errorMessage = '';
  }

}
