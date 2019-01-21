import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { CanFindRecipeGuard } from './recipes/guard/can-find-recipe.guard';
import { IsAuthenticatedGuard } from './shared/guard/is-authenticated.guard';
import { CanDeactivateGuard } from './shared/guard/can-deactivate.guard';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { IsNotAuthenticatedGuard } from './shared/guard/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
    canActivate: [IsAuthenticatedGuard]
  },
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
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: '/recipes',
    pathMatch: 'full',
    canActivate: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
