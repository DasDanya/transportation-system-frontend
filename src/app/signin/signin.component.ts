import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { SigninInfo } from '../auth/signin-info';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  //private loginInfo: AuthLoginInfo;
 
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

 
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
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.message;
        this.isLoginFailed = true;

        if(this.errorMessage.startsWith("Http failure response for") && this.errorMessage.includes("401 OK")){
          this.errorMessage = "неверный логин или пароль";
        }
      }
    );
  }
 
  reloadPage() {
    window.location.reload();
  }
}
