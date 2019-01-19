import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {LogMethod} from "../decorator/log-method.function";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string = null;

  constructor(private router: Router) {}

  signUpWithEmailAndPassword(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => this.onCreateUserFailed(error));
  }

  @LogMethod
  onCreateUserFailed(error: string) {}

  signInpWithEmailAndPassword(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response: any) => this.onSignInSucceeded(response))
      .catch((error) => this.onSignInFailed(error));
  }

  @LogMethod
  onSignInSucceeded(response?: any) {
    this.loadIdToken();
  }

  @LogMethod
  onSignInFailed(error: string) {}

  signOut(): Promise<any> {
    return firebase
      .auth()
      .signOut()
      .then((response: any) => this.onSignOutSucceeded(response))
      .catch((error) => this.onSignOutFailed(error));
  }

  @LogMethod
  onSignOutSucceeded(response?: any) {
    this.setAuthorizationToken(null);
    this.router.navigate(['/sign-in']);
  }

  @LogMethod
  onSignOutFailed(error: string) {}

  loadIdToken(): Promise<string|null> {
    return firebase
      .auth()
      .currentUser
      .getIdToken()
      .then((token: string) => {
        this.setAuthorizationToken(token);
        return this.getAuthorizationToken();
      })
      .catch(() => {
        this.setAuthorizationToken(null);
        return this.getAuthorizationToken();
      });
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getAuthorizationToken(): string {
    return this.token.slice();
  }

  setAuthorizationToken(token: string = null) {
    return this.token = token;
  }

}
