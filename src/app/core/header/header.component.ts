import { Component, OnInit } from '@angular/core';

import {RecipeBookService} from "../../shared/service/recipe-book.service";
import {AuthenticationService} from "../../shared/service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeBookService: RecipeBookService, public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.recipeBookService.saveData();
  }

  onFetchData() {
    this.recipeBookService.fetchData();
  }

  onSignOut() {
    this.authenticationService.signOut();
  }

}
