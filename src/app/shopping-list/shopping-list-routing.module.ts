import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {ShoppingListComponent} from "./shopping-list.component";
import {IsAuthenticatedGuard} from "../shared/guard/is-authenticated.guard";

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
