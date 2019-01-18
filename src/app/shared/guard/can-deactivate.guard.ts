import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { CanDeactivateComponent } from '../interface/can-deactivate-component';
import {LogMethod} from '../decorator/log-method.function';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(
    component: CanDeactivateComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
