import * as uuid from 'uuid';

export class Ingredient {
  public id: string;
  public name: string;
  public amount: number;

  public static compareIngredientsByNameAsc(a: Ingredient, b: Ingredient) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  constructor(ingredient: Ingredient = <Ingredient>{}) {
    this
      .withId(ingredient.id)
      .withName(ingredient.name)
      .withAmount(ingredient.amount);
  }

  withId(value: string = uuid.v4()) {
    this.id = value;
    return this;
  }

  withName(value: string) {
    this.name = value;
    return this;
  }

  withAmount(value: number) {
    this.amount = value;
    return this;
  }

}
