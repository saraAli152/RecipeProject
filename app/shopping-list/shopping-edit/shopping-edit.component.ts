import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Ingradients } from '../../models/Ingradients.model';
import { ShoopingListService } from '../../services/shooping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: false,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: true }) nameRaf!: ElementRef;
  @ViewChild('amountInput', { static: true }) amountRaf!: ElementRef;
  constructor(private shoopingListService: ShoopingListService) {}
  onAddItem() {
    this.shoopingListService.addIngradient(
      {
        name: this.nameRaf.nativeElement.value,
        amount: this.amountRaf.nativeElement.value,
      },
    );
    // Clear inputs
    this.nameRaf.nativeElement.value = '';
    this.amountRaf.nativeElement.value = '';
  }
}
