import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = false;

  constructor() {
    this.authenticated = true;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise(
      (resolve) => {
        resolve(this.authenticated);
      }
    );
  }

}
