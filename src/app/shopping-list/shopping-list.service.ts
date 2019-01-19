import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/model/ingredient.model';
import {HttpClient} from '@angular/common/http';
import {MeasureMethod} from '../shared/decorator/measure-method.function';
import {LogMethod} from '../shared/decorator/log-method.function';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<string>();

  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  @MeasureMethod
  @LogMethod
  loadIngredients(): Promise<Ingredient[]> {
    return new Promise((resolve) => {
      this.http.get('https://recipe-book-6c065.firebaseio.com/data/ingredients.json')
        .subscribe((json: Ingredient[]) => {
          this.ingredients = json.map((data) => new Ingredient(data));
          resolve(this.getIngredients());
        });
    });
  }

  getIngredients(): Promise<Ingredient[]> {
    if (this.ingredients.length !== 0) {
      return new Promise((resolve) => {
        resolve(this.getSortedIngredients());
      });
    }
    return this.loadIngredients();
  }

  findIngredientById(id: string): Promise<Ingredient | null> {
    return new Promise(
      (resolve, reject) => {
        this
          .getIngredients()
          .then((ingredients) => {
            const found: Ingredient = ingredients.find((ingredient) => ingredient.id === id);
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
  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getSortedIngredients());
  }

  @LogMethod
  public addIngredients(ingredients: Ingredient[] = []): void {
    this.ingredients.push(...ingredients); /* spread the ingredients in the array */
    this.ingredientsChanged.emit(this.getSortedIngredients());
  }

  @LogMethod
  public updateIngredient(ingredientId: string, updatedIngredient: Ingredient): Promise<Ingredient> {
    return new Promise((resolve) => {
      this.findIngredientById(ingredientId)
        .then(
          (ingredient: Ingredient) => {
            ingredient
              .withName(updatedIngredient.name)
              .withAmount(updatedIngredient.amount);

            this.ingredientsChanged.emit(this.getSortedIngredients());

            resolve(ingredient);
          }
        );
    });
  }

  @LogMethod
  public deleteIngredientById(ingredientId: string): Promise<Ingredient> {
    return new Promise((resolve) => {
      this.findIngredientById(ingredientId)
        .then(
          (ingredient: Ingredient) => {
            this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);

            this.ingredientsChanged.emit(this.getSortedIngredients());

            resolve(ingredient);
          }
        );
    });
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.emit(this.getSortedIngredients());
  }

  getSortedIngredients(): Ingredient[] {
    return this.ingredients.sort(Ingredient.compareIngredientsByNameAsc);
  }

}
