import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {LogMethod} from "../decorator/log-method.function";
import {Router} from "@angular/router";
import {OnBeforeAppStart} from "../interface/on-before-app-start";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnBeforeAppStart {

  private token: string = null;

  constructor(private router: Router) {}

  onLoadBeforeAppStart(): Promise<any> {
    return this
      .findAuthorizationTokenInLocalStorage()
      .then((token) => this.setAuthorizationToken(token));
  };

  signUpWithEmailAndPassword(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => this.onSignUpSucceeded(response))
      .catch((error) => this.onCreateUserFailed(error));
  }

  @LogMethod
  onSignUpSucceeded(response?: any) {
    this.loadIdToken();
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

  findAuthorizationTokenInLocalStorage(): Promise<string|null> {
    return new Promise(
      (resolve, reject) => {
        let firebaseDb: IDBOpenDBRequest = window.indexedDB.open('firebaseLocalStorageDb');
        if (!firebaseDb) {
          resolve(null);
          return null;
        }

        firebaseDb.onerror = function() {
          reject(null);
        };
        firebaseDb.onsuccess = function() {
          let request: IDBRequest = firebaseDb
            .result
            .transaction('firebaseLocalStorage', 'readonly')
            .objectStore("firebaseLocalStorage")
            .getAll();
          if (!request) {
            reject(null);
            return null;
          }

          request.onerror = function() {
            reject(null);
          };
          request.onsuccess = function() {
            let result: any[] = request.result;
            if (!result) {
              reject(null);
              return null;
            }

            let row: Object = result[0];
            if (!row) {
              reject(null);
              return null;
            }

            if (row.hasOwnProperty('value') && row['value'].hasOwnProperty('stsTokenManager')) {
              const token: string = row['value']['stsTokenManager']['accessToken'];
              resolve(token);
              return token;
            }
            reject(null);
            return null;
          };
        };
      }
    )
  }

}
