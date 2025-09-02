import { Component, Input } from "@angular/core";
import { Recipe } from "../../../models/Recipe.model";
import { RecipeService } from "../../../services/recipe.service";

@Component({
  selector: "app-recipe-item",
  standalone: false,
  templateUrl: "./recipe-item.component.html",
  styleUrl: "./recipe-item.component.scss",
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() index:number;

  constructor(private recipeService: RecipeService) {}
}
