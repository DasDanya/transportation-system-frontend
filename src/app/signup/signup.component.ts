import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignupInfo } from '../auth/signup-info';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form: any = {};
  //signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit() {

      if(this.form.password !== this.form.confirmPassword){
        this.errorMessage = "Пароли не совпадают";
        this.isSignUpFailed = true;
      }
      else{
        var signupInfo = new SignupInfo(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password);
      
      this.authService.signUp(signupInfo).subscribe(
        data => {
          this.isSignedUp = true;
          this.errorMessage = '';
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
          
          //errorStatus == 400 ? this.errorMessage = "Введенный логин(почта) уже используется в системе" : this.errorMessage = error.message;
        }
      );
    }
  }
}
