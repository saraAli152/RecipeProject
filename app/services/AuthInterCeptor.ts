import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthServiceService } from "./auth-service.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthInterCeptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user != null && user.token) {
          const modifiedReq = req.clone({
            params: new HttpParams().set("auth", user.token),
          });
          return next.handle(modifiedReq);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
