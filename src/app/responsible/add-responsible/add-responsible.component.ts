import { Component, OnInit } from '@angular/core';
import { Responsible } from '../responsible';
import { ResponsibleService } from '../responsible.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-responsible',
  templateUrl: './add-responsible.component.html',
  styleUrls: ['./add-responsible.component.css']
})
export class AddResponsibleComponent implements OnInit{
  form: any = {};
  failInAdd = false;
  errorMessage = '';
  selectedFile:File;
  startError = false;
 
  constructor(private responsibleService: ResponsibleService,private router: Router,private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
      this.accessVerification();
  }

  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  private accessVerification(){
    let userRoles = this.tokenStorage.getAuthorities();


    if(userRoles.indexOf('ROLE_ADMIN') !== -1){
      this.startError = false;
      this.errorMessage = '';
    }else{
      this.errorMessage = "Доступ к запрошенному ресурсу запрещен";
      this.startError =  true;
    }
  }

  onSubmit(){
      const responsible = new Responsible(
      this.form.surname,
      this.form.name,
      this.form.patronymic,
      this.form.phone
    );
    
  
    const responsibleWithPhoto = new FormData();
    //const userBlob = new Blob(JSON.stringify(this.responsible),{ type: "application/json"});
    const responsibleBlob = new Blob([JSON.stringify(responsible)], {type: "application/json"});
    responsibleWithPhoto.append('responsible',responsibleBlob);
    responsibleWithPhoto.append('photo', this.selectedFile);

    this.responsibleService.addResponsible(responsibleWithPhoto).subscribe(
        (data : any) =>{
        this.errorMessage = '';
        this.failInAdd = false;
        
        this.router.navigate(["responsible/all"]);
      },
      (error: HttpErrorResponse) =>{
        this.failInAdd = true;
        this.errorMessage = error.error.message;
      }
    )
    
  }
}
