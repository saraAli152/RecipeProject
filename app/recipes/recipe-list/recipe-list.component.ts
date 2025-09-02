import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../models/Recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  standalone: false,
  templateUrl: "./recipe-list.component.html",
  styleUrl: "./recipe-list.component.scss",
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }
}
