import { Component, OnInit } from '@angular/core';
import { Responsible } from '../responsible';
import { ResponsibleService } from '../responsible.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-update-responsible',
  templateUrl: './update-responsible.component.html',
  styleUrls: ['./update-responsible.component.css']
})
export class UpdateResponsibleComponent implements OnInit {

  form:any = {};
  selectedFile: File;

  errorMessage = '';
  error = false;
  responsible : Responsible;

  constructor(private responsibleService: ResponsibleService, private route: ActivatedRoute, private router: Router, private tokenStorage:TokenStorageService){}

  ngOnInit(): void {
    this.accessVerification();
    this.route.params.subscribe(params=> this.getUpdatedResponsible(params['id']))
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

  getUpdatedResponsible(id:number){
    this.responsibleService.updateResponsibleGet(id).subscribe(
      (response:Responsible) => {
        this.responsible = response;
        this.resetError();

        this.setValueInputs();
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }

  private setValueInputs():void{
    this.form.surname = this.responsible.surname;
    this.form.name = this.responsible.name;
    this.form.patronymic = this.responsible.patronymic;
    this.form.phone = this.responsible.phone;
  }


  private setError(error:HttpErrorResponse){
    this.errorMessage = error.error.message;
    this.error = true;
  }

  private resetError(){
    this.error = false;
    this.errorMessage = '';
  }

  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
  }

  
  onSubmit(){

    this.responsible = new Responsible(
      this.form.surname,
      this.form.name,
      this.form.patronymic,
      this.form.phone,
      this.responsible.id,
      this.responsible.photo
    );

    const responsibleUpdate = new FormData();
    const responsibleBlob = new Blob([JSON.stringify(this.responsible)], {type: "application/json"});
    responsibleUpdate.append('responsible',responsibleBlob);
    
    const file = document.getElementById('photo') as HTMLInputElement;

    if(file.value){
      responsibleUpdate.append('photo', this.selectedFile);
    }

    this.responsibleService.updateResponsible(responsibleUpdate).subscribe(
      (response:any) => {
        this.router.navigate(["responsible/all"]);
      },
      (error: HttpErrorResponse) => {
        this.setError(error);
      }
    )
  }
}
