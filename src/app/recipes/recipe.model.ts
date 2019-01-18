import {Ingredient} from '../shared/model/ingredient.model';
import * as uuid from 'uuid';

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  public static compareRecipesByNameAsc(a: Recipe, b: Recipe): number {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  public static compareRecipesByNameDesc(a: Recipe, b: Recipe): number {
    return -(Recipe.compareRecipesByNameAsc(a, b));
  }

  public static compareRecipesByDescriptionAsc(a: Recipe, b: Recipe): number {
    if (a.description < b.description) {
      return -1;
    }
    if (a.description > b.description) {
      return 1;
    }
    return 0;
  }

  public static compareRecipesByDescriptionDesc(a: Recipe, b: Recipe): number {
    return -(Recipe.compareRecipesByDescriptionAsc(a, b));
  }

  public static compareRecipesByIngredientsNumberAsc(a: Recipe, b: Recipe): number {
    return a.ingredients.length - b.ingredients.length;
  }

  public static compareRecipesByIngredientsNumberDesc(a: Recipe, b: Recipe): number {
    return -(Recipe.compareRecipesByIngredientsNumberAsc(a, b));
  }

  constructor(recipe: Recipe = <Recipe>{}) {
    this
      .withId(recipe.id)
      .withName(recipe.name)
      .withDescription(recipe.description)
      .withImagePath(recipe.imagePath)
      .withIngredients(recipe.ingredients);
  }

  withId(value: string = uuid.v4()) {
    this.id = value;
    return this;
  }

  withName(value: string) {
    this.name = value;
    return this;
  }

  withDescription(value: string) {
    this.description = value;
    return this;
  }

  withImagePath(value: string) {
    this.imagePath = value;
    return this;
  }

  withIngredients(ingredients: Ingredient[] = []): Recipe {
    this.ingredients = ingredients.map((ingredient) => new Ingredient(ingredient));
    return this;
  }

  addIngredient(value: Ingredient) {
    const found = this.findIngredientById(value.id);
    if (!found) {
      this.ingredients.push(value);
    }
  }

  addIngredients(value: Ingredient[] = []) {
    value.forEach((ingredient => this.addIngredient(ingredient)));
  }

  removeIngredient(value: Ingredient | string) {
    const found = this.findIngredientById(
      value instanceof Ingredient
        ? value.id
        : value
    );
    if (found) {
      this.ingredients.splice(this.ingredients.indexOf(found), 1 );
    }
  }

  removeIngredients(value: Ingredient[] = []) {
    value.forEach((ingredient) => this.removeIngredient(ingredient));
  }

  findIngredientById(id: string): Ingredient | null {
    if (!id) {
      return null;
    }
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }
}
