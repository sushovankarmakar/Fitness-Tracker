import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UIService } from "src/app/shared/ui.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  //minDate = new Date(Date.now());
  maxDate;
  isLoading = false;
  private loadingSubscription: Subscription;

  // injecting the AuthService
  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    //this.maxDate.setDate(this.maxDate.getDate());

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // this is executed when we hit the submit button
  onFormSubmit(form: NgForm) {
    //console.log(form);

    //registering a new user
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
