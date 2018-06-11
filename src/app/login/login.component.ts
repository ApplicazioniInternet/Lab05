import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginData = {username: '', password: ''};
  constructor(private authService: AuthorizationService,  private router: Router) {}

  login(): void {
      this.authService.obtainAccessToken(this.loginData);
  }


}
