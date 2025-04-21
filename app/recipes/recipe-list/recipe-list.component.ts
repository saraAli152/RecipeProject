import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

}
