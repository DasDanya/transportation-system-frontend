import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private apiServerUrl = 'http://localhost:8080/api';

  attemptAuth(credentials: SigninInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiServerUrl}/auth/signin`, credentials, httpOptions);
  }
  
  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/auth/signup`, info, httpOptions);
  }

  constructor(private http: HttpClient) { }
}