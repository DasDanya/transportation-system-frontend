import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  roles!: string[];
  authority!: string;
  title = 'transportation-system-frontend';

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
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
    window.location.reload();
  }
}
