import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { SigninInfo } from '../auth/signin-info';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  //private loginInfo: AuthLoginInfo;
 
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }
 
  // ngOnInit() {
  //   if (this.tokenStorage.getToken()) {
  //     this.isLoggedIn = true;
  //     this.roles = this.tokenStorage.getAuthorities();
  //   }
  // }

 
  onSubmit() {
    var loginInfo = new SigninInfo(
      this.form.username,
      this.form.password);
 
    this.authService.attemptAuth(loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
 
        this.isLoginFailed = false;
        this.errorMessage = '';

        this.router.navigate(["home"]).then(()=>window.location.reload());

      },
      (error: HttpErrorResponse) => {
        this.isLoginFailed = true;
        var errorStatus = error.status;

        errorStatus == 401 ? this.errorMessage = "неверный логин или пароль" : this.errorMessage  = error.error.message;
      }
    );
  }
}
