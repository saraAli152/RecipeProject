import { Component, OnInit } from "@angular/core";
import { Ingradients } from "../models/Ingradients.model";
import { ShoopingListService } from "../services/shooping-list.service";

@Component({
  selector: "app-shopping-list",
  standalone: false,
  templateUrl: "./shopping-list.component.html",
  styleUrl: "./shopping-list.component.scss",
})
export class ShoppingListComponent implements OnInit {
  ingradients: Ingradients[] = [];
  constructor(private shoopingListService: ShoopingListService) {}
  ngOnInit(): void {
    this.ingradients = this.shoopingListService.getIngradients();
  }
  onEdit(index: number) {
    this.shoopingListService.startEditung.next(index);
  }
}
