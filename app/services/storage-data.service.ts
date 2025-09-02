import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { response } from "express";
import { log } from "console";
import { Recipe } from "../models/Recipe.model";
import { EMPTY, exhaustMap, take } from "rxjs";
import { AuthServiceService } from "./auth-service.service";

@Injectable({
  providedIn: "root",
})
export class StorageDataService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthServiceService
  ) {}
  storageData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://recipesproject-bd3c3-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }
  fetchData() {
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          if (user != null && user.id) {
            return this.http.get<Recipe[]>(
              "https://recipesproject-bd3c3-default-rtdb.firebaseio.com/recipes.json"
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe({
        next: (data: Recipe[]) => this.recipeService.setRecipes(data),
      });
  }
}
