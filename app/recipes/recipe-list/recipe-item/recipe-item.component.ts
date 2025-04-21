import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/Recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  standalone: false,
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) {}

  onSelect() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
  // Function to split recipes into groups of 2 for each row
 
}
