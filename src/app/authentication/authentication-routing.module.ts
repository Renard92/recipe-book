import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {IsNotAuthenticatedGuard} from "../shared/guard/is-not-authenticated.guard";

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [IsNotAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
