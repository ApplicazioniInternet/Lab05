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
      const httpOptions = {
          headers: new HttpHeaders({
              'Authorization': 'Basic ' + btoa('client:password'),
              'Content-type': 'application/x-www-form-urlencoded'
          })
      };

      console.log(params.toString());
      this._http.post('http://localhost:8080/oauth/token', params.toString(), httpOptions)
          .subscribe(
              data => {
                  this.saveToken(data);
                  console.log(data);
                  if (this.redirectUrl) {
                      this._router.navigate([this.redirectUrl]);
                  }
              },
              err => {
                  console.log('Errore richiesta token oauth2');
                  console.log(err);
              });
  }

  saveToken(token) {
      const expireDate = new Date().getTime() + (1000 * token.expires_in);
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('access_token_expire', expireDate.toString());
      this._router.navigate(['/']);
  }
}
