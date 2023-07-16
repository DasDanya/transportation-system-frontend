import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  roles!: string[];
  authority!: string;
  username!: string;
  title = 'transportation-system-frontend';

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MODERATOR') {
          this.authority = 'mod';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logout(){
    this.tokenStorage.signOut();
    this.router.navigate(["home"]).then(()=>window.location.reload());
  }
}
