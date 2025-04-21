import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-details',
  standalone: false,
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.scss',
})
export class RecipesDetailsComponent {
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) {}
  addToShoppingList() {
    console.log(this.recipe.ingradient);
    this.recipeService.addIngradientToShoppingList(this.recipe.ingradient);
  }
}
