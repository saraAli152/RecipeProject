import { Injectable } from '@angular/core';
import { Ingradients } from '../models/Ingradients.model';

@Injectable({
  providedIn: 'root',
})
export class ShoopingListService {
  ingradients: Ingradients[] = [
    { name: 'apple', amount: 50 },
    { name: 'mango', amount: 100 },
    { name: 'banana', amount: 70 },
  ];

  constructor() {}

  addIngradient(ingradient: Ingradients) {
    this.ingradients.push(ingradient);
  }
  getIngradients() {
    return this.ingradients; // Return copy
  }
}
