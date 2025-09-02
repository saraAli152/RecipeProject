import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ReturnStatement } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { IAuthResponseData } from "../models/auth.model";
import { User } from "../models/user.data";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}
  register(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCer7TXuy5nEVoUtsdlby1mom3IH2yLqT0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.hendleErrors(errorResponse);
        }),
        tap((responseData) => {
          this.handleUserAnthenticton(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCer7TXuy5nEVoUtsdlby1mom3IH2yLqT0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.hendleErrors(errorResponse);
        }),
        tap((responseData) => {
          this.handleUserAnthenticton(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  logout() {
    this.user.next(null);
    this.router.navigate(["/registerForm"]);
  }

  private hendleErrors(errorResponse: HttpErrorResponse) {
    let errorMessage = "Unknown Error";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "email exists";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = " password inValid";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = " email not found";
        break;
      case "INVALID_PASSWORD":
        errorMessage = " invalid passoword";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an admin";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "INVALID_LOGIN_CREDENTIALS";
    }
    return throwError(() => new Error(errorMessage));
  }
  private handleUserAnthenticton(
    email: string,
    userId: string,
    tokenId: string,
    expirDate: number
  ) {
    const expirtionDate = new Date(new Date().getTime() + +expirDate * 1000);
    const user = new User(email, userId, tokenId, expirtionDate);
    this.user.next(user);
  }
}
