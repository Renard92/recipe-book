import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/model/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {MeasureMethod} from '../shared/decorator/measure-method.function';
import {LogMethod} from '../shared/decorator/log-method.function';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private shoppingListService: ShoppingListService) {}

  @MeasureMethod
  @LogMethod
  loadRecipes(): Promise<Recipe[]> {
    return new Promise((resolve) => {
      this.http
        .get<Recipe[]>('https://recipe-book-6c065.firebaseio.com/data/recipes.json')
        .subscribe((json: Recipe[]) => {
          this.recipes = json.map((data) => new Recipe(data));
          resolve(this.getSortedRecipes());
        });
    });
  }

  getRecipes(): Promise<Recipe[]> {
    if (this.recipes.length !== 0) {
      return new Promise((resolve) => {
        resolve(this.getSortedRecipes());
      });
    }
    return this.loadRecipes();
  }

  findRecipeById(id: string): Promise<Recipe|null> {
    return new Promise(
      (resolve, reject) => {
        this
          .getRecipes()
          .then((recipes) => {
            const found: Recipe = recipes.find((recipe) => recipe.id === id);
            if (found) {
              resolve(found);
            } else {
              reject(null);
            }
          })
          .catch(() => {
            reject(null);
          });
      }
    );
  }

  @LogMethod
  public addIngredientsToShoppingList(ingredients: Ingredient[] = []) {
    this.shoppingListService.addIngredients(
      ingredients.map((ingredient) => new Ingredient(ingredient))
    );
  }

  @LogMethod
  public updateRecipe(recipeId: string, updatedRecipe: Recipe): Promise<Recipe> {
    return new Promise((resolve) => {
      this.findRecipeById(recipeId)
        .then(
          (recipe: Recipe) => {
            recipe
              .withName(updatedRecipe.name)
              .withDescription(updatedRecipe.description)
              .withImagePath(updatedRecipe.imagePath)
              .withIngredients(updatedRecipe.ingredients);

            this.recipesChanged.emit(this.getSortedRecipes());

            resolve(recipe);
          }
        );
    });
  }

  @LogMethod
  public addRecipe(recipe: Recipe): Promise<Recipe> {
    return new Promise((resolve) => {
      console.log(recipe);
      this.recipes.push(recipe);
      this.recipesChanged.emit(this.getSortedRecipes());
      resolve(recipe);
    });
  }

  @LogMethod
  public addRecipes(recipes: Recipe[] = []): Promise<Recipe[]> {
    return new Promise((resolve) => {
      this.recipes.push(...recipes); /* spread the recipes in the array */
      this.recipesChanged.emit(this.getSortedRecipes());
      resolve(recipes);
    });
  }

  @LogMethod
  public deleteRecipeById(recipeId: string): Promise<Recipe> {
    return new Promise((resolve) => {
      this.findRecipeById(recipeId)
        .then(
          (recipe: Recipe) => {
            this.recipes.splice(this.recipes.indexOf(recipe), 1);

            this.recipesChanged.emit(this.getSortedRecipes());

            resolve(recipe);
          }
        );
    });
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.emit(this.getSortedRecipes());
  }

  getSortedRecipes(): Recipe[] {
    return this.recipes.sort(Recipe.compareRecipesByNameAsc);
  }

}
