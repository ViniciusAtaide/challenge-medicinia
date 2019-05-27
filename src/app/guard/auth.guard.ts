import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from "@angular/router";
import { AuthService, Session } from "../service/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    const session: Session = JSON.parse(localStorage.getItem("session"));

    if (session && session.token) {
      if (url === "/login") {
        this.router.navigate(["/home"]);
      }
      return true;
    }
    this.authService.redirectUrl = url;

    this.router.navigate(["/login"]);
    return false;
  }
}
