import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private auth: AuthService) {}

  login() {
    console.log(environment.auth.redirectUri);
    // this.auth.loginWithRedirect();
    this.auth.isAuthenticated$.subscribe(res => {
      console.log('Connected ?', res);
      if (!res) {
        this.auth.loginWithRedirect();
      } else {
        this.auth.idTokenClaims$.subscribe(res => {
          console.log(res);
        });
      }
    });
  }
}
