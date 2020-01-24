import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  //this method will be executed by angular
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // it needs to return true, or a promise that resolves to true
    // or an observable that resolves to true

    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
