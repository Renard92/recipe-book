import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipesComponent} from "./recipes.component";
import {IsAuthenticatedGuard} from "../shared/guard/is-authenticated.guard";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {CanDeactivateGuard} from "../shared/guard/can-deactivate.guard";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {CanFindRecipeGuard} from "./guard/can-find-recipe.guard";

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        canActivate: [IsAuthenticatedGuard]
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [IsAuthenticatedGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        canActivate: [IsAuthenticatedGuard, CanFindRecipeGuard]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [IsAuthenticatedGuard, CanFindRecipeGuard],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
