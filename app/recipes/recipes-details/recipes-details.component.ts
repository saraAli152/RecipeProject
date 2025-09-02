import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../models/Recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipes-details",
  standalone: false,
  templateUrl: "./recipes-details.component.html",
  styleUrl: "./recipes-details.component.scss",
})
export class RecipesDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private actvitedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.actvitedRoute.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }
  addToShoppingList() {
    this.recipeService.addIngradientToShoppingList(this.recipe.ingradients);
  }
  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.actvitedRoute });
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
