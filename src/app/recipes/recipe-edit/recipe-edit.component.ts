import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/model/ingredient.model';
import {LogMethod} from '../../shared/decorator/log-method.function';
import {CanDeactivateComponent} from '../../shared/interface/can-deactivate-component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanDeactivateComponent {

  id: string;
  editMode = false;
  changesSaved = false;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {}

  ngOnInit() {
    this.init();
    this.route.params
      .subscribe((params) => this.onRouteParamsChanged(params));
  }

  onRouteParamsChanged(params: Params) {
    this.id = params['id'];
    this.editMode = !!this.id;

    this.initByEditMode();
  }

  private init(recipe: Recipe = new Recipe()): void {
    this.form = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      ingredients: new FormArray(
        recipe.ingredients.map((ingredient) => this.mapIngredientToFormGroup(ingredient))
      )
    });
  }

  private mapIngredientToFormGroup(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  getIngredientControls() {
    return this.getIngredientFormArray().controls;
  }

  private getIngredientFormArray(): FormArray {
    return (<FormArray>this.form.get('ingredients'));
  }

  private initByEditMode(): void {
    if (this.editMode) {
      this.recipeService.findRecipeById(this.id)
        .then((recipe) => this.init(recipe))
        .catch(() => this.init());
    } else {
      this.init();
    }
  }

  onAddIngredient() {
    this
      .getIngredientFormArray()
      .push(this.mapIngredientToFormGroup(new Ingredient()));
  }

  onDeleteIngredient(index: number) {
    this
      .getIngredientFormArray()
      .removeAt(index);
  }

  @LogMethod
  onSubmit() {
    const recipe = new Recipe(<Recipe>this.form.value);

    console.log(this.form.value);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe)
        .then(() => {
          this.changesSaved = true;
          this.navigateToRecipeById(this.id);
        });
    } else {
      this.recipeService.addRecipe(recipe)
        .then((addedRecipe: Recipe) => {
          this.changesSaved = true;
          this.navigateToRecipeById(addedRecipe.id);
        });
    }
  }

  onCancel() {
    this.initByEditMode();
  }

  onBack() {
    if (this.id) {
      this.navigateToRecipeById(this.id);
    } else {
      this.navigateToRecipes();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.form.dirty) {
      return true;
    }
    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes ?');
    } else {
      return true;
    }
  }

  navigateToRecipeById(id: string) {
    if (id) {
      this.router.navigate(['recipes', id]);
    }
  }

  navigateToRecipes() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
