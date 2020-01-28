import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // it will get merged with other routers behind the scene.
  exports: [RouterModule]
})
export class AuthRoutingModule {}
