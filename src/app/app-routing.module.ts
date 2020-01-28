import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
// import { SignupComponent } from "./auth/signup/signup.component";
// import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  // { path: "signup", component: SignupComponent },
  // { path: "login", component: LoginComponent },   // these have been shifted to auth-routing.module.ts

  // we need to implement lazy routing for training because we need to load when we need it
  // if the user is not logged in, we don't need to load the training component in advanced.
  //{ path: "training", component: TrainingComponent, canActivate: [AuthGuard] } // protecting the training route

  // here we are lazy loading the TrainingModule
  {
    path: "training",
    loadChildren: "./training/training.module#TrainingModule",
    canLoad: [AuthGuard]
  } // loadChildren is the keyword for lazy loading
];

//behind the scene, angular treated the "AuthGuard" as a service, so we have to provide that in the providers array.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
