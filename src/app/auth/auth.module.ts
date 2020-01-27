import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; // CommonModule gives us access the ngIf,ngFor and so on.
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "../material.module";

// if you use something in the module you need to import there,
// the things are not exchanged between the modules.

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AuthModule {}
