import { Injectable } from '@angular/core';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../../recipes/recipe.service';
import {RecipeBookData} from "../model/recipe-book-data";
import {HttpClient} from "@angular/common/http";
import {LogMethod} from "../decorator/log-method.function";
import {MeasureMethod} from "../decorator/measure-method.function";

@Injectable({
  providedIn: 'root'
})
export class RecipeBookService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) {
  }

  @MeasureMethod
  @LogMethod
  saveData(): Promise<RecipeBookData> {
    return new Promise((resolve, reject) => {
      const data: RecipeBookData = new RecipeBookData(<RecipeBookData>{
        recipes: this.recipeService.getSortedRecipes(),
        ingredients: this.shoppingListService.getSortedIngredients()
      });
      this.http
        .put<RecipeBookData>('https://recipe-book-6c065.firebaseio.com/data.json', data)
        .subscribe(
          () => {
            resolve(data);
          },
          () => {
            reject();
          }
        )
    });
  }

  @MeasureMethod
  @LogMethod
  fetchData(): Promise<RecipeBookData> {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://recipe-book-6c065.firebaseio.com/data.json')
        .subscribe(
          (json: RecipeBookData) => {
            const data: RecipeBookData = new RecipeBookData(json);

            this.recipeService.setRecipes(data.recipes);
            this.shoppingListService.setIngredients(data.ingredients);

            resolve(data);
          },
          () => {
            reject();
          }
        )
    });
  }
}
