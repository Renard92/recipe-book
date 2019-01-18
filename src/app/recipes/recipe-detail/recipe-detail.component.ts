import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: string;
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => this.onRouteParamsChanged(params));
  }

  onRouteParamsChanged(params: any) {
    this.id = params['id'];
    this.recipeService
      .findRecipeById(this.id)
      .then((recipe) => this.recipe = recipe)
      .catch(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipeById(this.recipe.id)
      .then(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

}
