import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  redirectUrl;

  isAuthenticated(): boolean {
    return true;
  }

  constructor() { }
}
