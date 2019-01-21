import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/directive/dropdown.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthenticationService } from './shared/service/authentication.service';
import { IsAuthenticatedGuard } from './shared/guard/is-authenticated.guard';
import { CanDeactivateGuard } from './shared/guard/can-deactivate.guard';
import { CanFindRecipeGuard } from './recipes/guard/can-find-recipe.guard';
import { CurrencyPipe } from './shared/pipe/currency.pipe';
import { RecipeBookService } from "./shared/service/recipe-book.service";
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { httpInterceptorProviders } from "./app-http-interceptors";
import { IsNotAuthenticatedGuard } from "./shared/guard/is-not-authenticated.guard";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    CurrencyPipe,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthenticationService,
    ShoppingListService,
    RecipeService,
    RecipeBookService,
    IsAuthenticatedGuard,
    IsNotAuthenticatedGuard,
    CanDeactivateGuard,
    CanFindRecipeGuard,
    // { provide: APP_INITIALIZER, useFactory: onBeforeAppStartFactory, deps: [AuthenticationService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
