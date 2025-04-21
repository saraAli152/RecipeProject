import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../models/Recipe.model';
import { ShoopingListService } from './shooping-list.service';
import { Ingradients } from '../models/Ingradients.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    {
      name: 'pizza',
      description: 'pizza',
      imagePath: './assets/images/Piazza-4.webp',
      ingradient: { name: 'potato1', amount: 100 },
    },
    {
      name: 'pizza2',
      description: 'pizza',
      imagePath: './assets/images/Piazza-4.webp',
      ingradient: { name: 'potato2', amount: 100 },
    },
    {
      name: 'pizza3',
      description: 'pizza',
      imagePath: './assets/images/3.jpg',
      ingradient: { name: 'potato3', amount: 100 },
    },
    {
      name: 'pizza4',
      description: 'pizza',
      imagePath: './assets/images/3.jpg',
      ingradient:{ name: 'potato4', amount: 100 },
    },
  ];
  constructor(private shoopingListService: ShoopingListService) {}
  getRecipes() {
    return this.recipes;
  }
  addIngradientToShoppingList(ingradient: Ingradients) {
    this.shoopingListService.addIngradient(ingradient);
  }
}
