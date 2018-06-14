import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  redirectUrl;

  constructor(private _router: Router, private _http: HttpClient, public jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  obtainAccessToken(loginData) {
      const params = new HttpParams()
          .set('username', loginData.username)
          .set('password', loginData.password)
          .set('grant_type', 'password');

      const headersValue = new HttpHeaders()
          .append('Authorization', 'Basic ' + btoa('client:password'))
          .append('Content-type', 'application/x-www-form-urlencoded');

      const httpOptions = {
          headers: headersValue
      };

      this._http.post('http://localhost:8080/oauth/token', params.toString(), httpOptions)
          .subscribe(
              data => {
                  this.saveToken(data);
                  if (this.redirectUrl) {
                      this._router.navigate([this.redirectUrl]);
                  } else {
                      this._router.navigate(['/']);
                  }
              },
              err => {
                  alert('login fallito');
                  console.log(err);
              });
  }

  saveToken(token) {
      const expireDate = new Date().getTime() + (1000 * token.expires_in);
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('access_token_expire', expireDate.toString());
  }


  logout(): void {
      localStorage.removeItem('access_token');
  }
}
