import { Subject } from "rxjs/Subject";
// Subject is an object which allows you to event emits and subscribed to it and other parts of the map.

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { error } from "util";
import { auth } from "firebase";
import { ExerciseService } from "../training/exercise.service";

// this auth service is put in the provider array in app.module.ts
// inject the auth service into the singup component.

// We need Injectable() decorator for injecting a service into a service.

@Injectable()
export class AuthService {
  //passing a boolean payload, it can be generic also.
  // it is similar as EventEmitter
  authChange = new Subject<boolean>();
  //private user: User;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private exerciseService: ExerciseService
  ) {}

  //below two method will send different request to server
  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        //this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });

    // createUserWithEmailAndPassword() returns a promise on
    // which we can handle success and potential errors.
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };

    this.angularFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        //this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // private authSuccessfully() {
  // this.isAuthenticated = true;
  // this.authChange.next(true); // true means user is logged in now.
  // this.router.navigate(["/training"]);
  // }

  // this method should start when our app starts. so it is called in app.component.ts
  initAuthListener() {
    //authState is an observable to which we can subscribe
    //and it will emit an event whenever the authentication status changes.
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        // when user is authenticated
        this.isAuthenticated = true;
        this.authChange.next(true); // true means user is logged in now.
        this.router.navigate(["/training"]); // if user is authenticated, navigate to training
      } else {
        this.exerciseService.cancelFirebaseSubscriptions();
        this.authChange.next(false); // false means user is logged out now.
        this.router.navigate(["/login"]); // if user is unauthenticated, navigate to login
        this.isAuthenticated = false;
      }
    });
  }

  logout() {
    //this.user = null;

    //singOut returns a promise
    this.angularFireAuth.auth.signOut().then(
      () => {
        console.log("Log out successful");
      },
      error => {
        console.log("Log out unsucessful");
      }
    );

    // this.authChange.next(false); // false means user is logged out now.
    // this.router.navigate(["/login"]);
    // this.isAuthenticated = false;

    // getting error while logging out so, reloading the window.
    // https://medium.com/@dalenguyen/handle-missing-or-insufficient-permissions-firestore-error-on-angular-or-ionic-bf4edb7a7c68
    window.location.reload();
  }

  // getUser() {
  //   return { ...this.user }; //sending a new user object using spread operator
  // }

  isAuth() {
    //return this.user != null; // if the user in not null, then the user is authenticated.
    return this.isAuthenticated;
  }
}
