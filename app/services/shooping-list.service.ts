import { Injectable } from "@angular/core";
import { Ingradients } from "../models/Ingradients.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoopingListService {
  startEditung = new Subject<number>();
  ingradients: Ingradients[] = [
    { name: "apple", amount: 50 },
    { name: "mango", amount: 100 },
    { name: "banana", amount: 70 },
  ];

  constructor() {}

  addIngradient(ingradient: Ingradients) {
    this.ingradients.push(ingradient);
  }
  addIngradients(ingradients: Ingradients[]) {
    this.ingradients.push(...ingradients);
  }
  getIngradients() {
    return this.ingradients; // Return copy
  }
  getIngradientsByIndex(index: number) {
    return this.ingradients[index];
  }
  updateIngradients(index: number, NewIngradtient: Ingradients) {
    this.ingradients[index] = NewIngradtient;
  }
  deleteItemByIndex(index: number) {
    this.ingradients.splice(index, 1);
  }
}
