import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/model/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingListService
      .getIngredients()
      .then((ingredients) => this.ingredients = ingredients);

    this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => this.onIngredientsChanged(ingredients));
  }

  onIngredientsChanged(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  onEditIngredient(ingredient: Ingredient) {
    this.shoppingListService.startedEditing.next(ingredient.id);
  }

}
