import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {RecipeService} from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class CanFindRecipeGuard implements CanActivate {

  constructor(private recipeService: RecipeService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.recipeService.findRecipeById(next.params['id'])
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
