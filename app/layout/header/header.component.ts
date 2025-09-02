import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { StorageDataService } from "../../services/storage-data.service";
import { Subscription } from "rxjs";
import { AuthServiceService } from "../../services/auth-service.service";

@Component({
  selector: "app-header",
  standalone: false,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAutheniction: boolean = false;
  constructor(
    private storageService: StorageDataService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((userData) => {
      this.isAutheniction = userData ? true : false;
    });
  }

  onStorageData() {
    this.storageService.storageData();
  }
  onFetchData() {
    this.storageService.fetchData();
  }
  onLogOut() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
