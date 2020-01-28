import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UIService } from "src/app/shared/ui.service";
//import { Subscription, Observable } from "rxjs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  //isLoading = false; // if false, show mat-spinner, if true, show login button
  //private loadingSubscription: Subscription;

  isLoading$: Observable<boolean>; // if false, show mat-spinner, if true, show login button
  // use $ at the end of the variable names which will be controlled by NgRx

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading: boolean) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl("", {
        validators: [Validators.required, Validators.required]
      })
    });
  }

  onSubmit() {
    //console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  // commenting ngOnDestroy() as we are not using loadingSubscription, now using NgRx
  // ngOnDestroy() {
  //   if (this.loadingSubscription) {
  //     this.loadingSubscription.unsubscribe();
  //   }
  // }
}
