import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { httpInterceptorProviders } from '../app-http-interceptors';
import { AuthenticationService } from '../shared/service/authentication.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { RecipeBookService } from '../shared/service/recipe-book.service';
import { IsAuthenticatedGuard } from '../shared/guard/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from '../shared/guard/is-not-authenticated.guard';
import { CanDeactivateGuard } from '../shared/guard/can-deactivate.guard';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    // { provide: APP_INITIALIZER, useFactory: onBeforeAppStartFactory, deps: [AuthenticationService], multi: true }
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule { }
