import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Ingradients } from "../../models/Ingradients.model";
import { ShoopingListService } from "../../services/shooping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  standalone: false,
  templateUrl: "./shopping-edit.component.html",
  styleUrl: "./shopping-edit.component.scss",
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: true }) shoppingeditlist: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editIndexItem: number;
  editedIem: Ingradients;
  constructor(private shoopingListService: ShoopingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoopingListService.startEditung.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndexItem = index;
        this.editedIem = this.shoopingListService.getIngradientsByIndex(index);
        this.shoppingeditlist.setValue({
          name: this.editedIem.name,
          amount: this.editedIem.amount,
        });
      }
    );
  }
  onAddItem(f: NgForm) {
    const formValue = f.value;
    const ingradient = new Ingradients(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shoopingListService.updateIngradients(
        this.editIndexItem,
        ingradient
      );
    } else {
      this.shoopingListService.addIngradient(ingradient);
    }
    this.editMode = false;
    f.reset();
  }
  onClear() {
    this.editMode = false;
    this.shoppingeditlist.reset();
  }
  onDelete() {
    this.shoopingListService.deleteItemByIndex(this.editIndexItem);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
