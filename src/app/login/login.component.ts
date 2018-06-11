import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  toolbarTitle = 'Login';
  public loginData = {username: '', password: ''};
  constructor(private authService: AuthorizationService,  private router: Router) {}

  ngOnInit () {
    if (this.authService.isAuthenticated()) {
        this.router.navigate(['/']);
    }
  }

  login(): void {
      this.authService.obtainAccessToken(this.loginData);
  }


}
