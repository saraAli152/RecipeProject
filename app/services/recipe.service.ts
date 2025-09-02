import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "../models/Recipe.model";
import { ShoopingListService } from "./shooping-list.service";
import { Ingradients } from "../models/Ingradients.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  constructor(private shoopingListService: ShoopingListService) {}
  getRecipes() {
    return this.recipes;
  }
  getRecipeById(i: number) {
    return this.recipes[i];
  }
  addIngradientToShoppingList(ingradients: Ingradients[]) {
    this.shoopingListService.addIngradients(ingradients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }
  updatRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes);
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }
}
