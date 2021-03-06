import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.authenticationService.isAuthenticated();
  }
}
