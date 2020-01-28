import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

// if you use something in the module you need to import there,
// the things are not exchanged between the modules.

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ]
  //exports: [FormsModule, ReactiveFormsModule]
})
export class AuthModule {}
