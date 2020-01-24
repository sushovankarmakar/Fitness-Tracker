import { Subject } from "rxjs/Subject";
// Subject is an object which allows you to event emits and subscribed to it and other parts of the map.

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// this auth service is put in the provider array in app.module.ts
// inject the auth service into the singup component.

// We need Injectable() decorator for injecting a service into a service.

@Injectable()
export class AuthService {
  //passing a boolean payload, it can be generic also.
  // it is similar as EventEmitter
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  //below two method will send different request to server
  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  private authSuccessfully() {
    this.authChange.next(true); // true means user is logged in now.
    this.router.navigate(["/training"]);
  }

  logout() {
    this.user = null;
    this.authChange.next(false); // false means user is logged out now.
    this.router.navigate(["/login"]);
  }

  getUser() {
    return { ...this.user }; //sending a new user object using spread operator
  }

  isAuth() {
    return this.user != null; // if the user in not null, then the user is authenticated.
  }
}
