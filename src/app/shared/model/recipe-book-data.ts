import {Recipe} from "../../recipes/recipe.model";
import {Ingredient} from "./ingredient.model";

export class RecipeBookData {
  public recipes: Recipe[];
  public ingredients: Ingredient[];

  constructor(recipeBookData: RecipeBookData = <RecipeBookData>{}) {
    this
      .withRecipes(recipeBookData.recipes)
      .withIngredients(recipeBookData.ingredients);
  }

  withRecipes(recipes: Recipe[] = []): RecipeBookData {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
    return this;
  }

  withIngredients(ingredients: Ingredient[] = []): RecipeBookData {
    this.ingredients = ingredients.map((ingredient) => new Ingredient(ingredient));
    return this;
  }
}
