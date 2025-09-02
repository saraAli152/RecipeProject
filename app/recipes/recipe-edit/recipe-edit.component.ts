import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/Recipe.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  standalone: false,
  templateUrl: "./recipe-edit.component.html",
  styleUrl: "./recipe-edit.component.scss",
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  mainForm: FormGroup;
  constructor(
    private activtedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  private initForm() {
    let recipeName = "";
    let recipeDescription = "";
    let recipeImageUrl = "";
    let recipeIngradients: FormArray = new FormArray<any>([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImageUrl = recipe.imageUrl;
      if (recipe.ingradients) {
        for (let ing of recipe.ingradients) {
          recipeIngradients.push(
            new FormGroup({
              name: new FormControl(ing.name),
              amount: new FormControl(ing.amount),
            })
          );
        }
      }
    }
    this.mainForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDescription),
      imageUrl: new FormControl(recipeImageUrl),
      ingradients: recipeIngradients,
    });
  }

  ngOnInit(): void {
    this.activtedRoute.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.editMode = param["id"] != null;
      this.initForm();
      console.log("Main Form initialized:", this.mainForm);
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.mainForm.value.name,
      this.mainForm.value.description,
      this.mainForm.value.imageUrl,
      this.mainForm.value.ingradients
    );

    if (this.editMode) {
      this.recipeService.updatRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  onAddIngradient() {
    (<FormArray>this.mainForm.get("ingradients")).push(
      new FormGroup({
        name: new FormControl(""),
        amount: new FormControl("recipe.ingradient.amount"),
      })
    );
  }
  get ingradientControl() {
    return (<FormArray>this.mainForm.get("ingradients")).controls;
  }
  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.activtedRoute });
  }
  onDeleteIngradeint(index: number) {
    (<FormArray>this.mainForm.get("ingradients")).removeAt(index);
  }
}
