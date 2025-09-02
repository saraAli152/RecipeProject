import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthServiceService } from "../services/auth-service.service";
import { IAuthResponseData } from "../models/auth.model";
import { Observable } from "rxjs";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-register-form",
  standalone: false,
  templateUrl: "./register-form.component.html",
  styleUrl: "./register-form.component.scss",
})
export class RegisterFormComponent {
  isLoginMode: boolean = false;
  loading: boolean = false;
  error: any = null;
  authOds: Observable<IAuthResponseData>;

  constructor(
    private authservice: AuthServiceService,
    private router: Router
  ) {}
  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    console.log(password);

    if (this.isLoginMode) {
      this.authOds = this.authservice.logIn(email, password);
    } else {
      this.authOds = this.authservice.register(email, password);
    }
    this.authOds.subscribe({
      next: (data) => {
        this.loading = false;
        this.error = null;
        this.router.navigate(["/recipes"]);
      },
      error: (error) => {
        (this.loading = false), (this.error = error);
      },
    });
    form.reset();
  }
}
