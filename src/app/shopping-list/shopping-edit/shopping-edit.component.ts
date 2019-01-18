import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/model/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  startedEditingSubscription: Subscription;
  editMode = false;
  ingredientId: string;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

  ngOnInit() {
    this.startedEditingSubscription = this.shoppingListService.startedEditing
      .subscribe((id: string) => this.onStartedEditingIngredientById(id));
  }

  onStartedEditingIngredientById(id: string) {
    this.editMode = true;
    this.ingredientId = id;

    this.shoppingListService
      .findIngredientById(this.ingredientId)
      .then((ingredient: Ingredient) => {
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      });
  }

  onAddItem(form: NgForm) {
    const ingredient = new Ingredient(<Ingredient> {
      name: form.value.name,
      amount: form.value.amount
    });

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredientId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onClear();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredientById(this.ingredientId);

    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

}
