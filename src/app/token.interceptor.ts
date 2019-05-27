import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from "@angular/common/http";
import { AuthService, Session } from "./service/auth.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const session: Session = JSON.parse(localStorage.getItem("session"));

    if (!request.url.includes("/v1/users/signin")) {
      request = request.clone({
        setHeaders: {
          Authorization: session.token,
          "Content-Type": "json"
        }
      });
    }

    return next.handle(request);
  }
}
