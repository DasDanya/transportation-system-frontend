import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignupInfo } from '../auth/signup-info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {};
  //signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

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
        },
        error => {
          this.errorMessage = error.message;
          this.isSignUpFailed = true;

          if(this.errorMessage.startsWith("Http failure response for") && this.errorMessage.includes("400 OK")){
            this.errorMessage = "Введенный логин(почта) уже используется в системе";
          }
        }
      );
    }
  }
}
