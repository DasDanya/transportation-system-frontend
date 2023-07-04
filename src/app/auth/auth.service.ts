import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { JwtResponse } from './jwt-response';
import { SigninInfo} from './signin-info';
import { SignupInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signinUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  
  attemptAuth(credentials: SigninInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.signinUrl, credentials, httpOptions);
  }
  
  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  constructor(private http: HttpClient) { }
}