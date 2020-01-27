import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; // CommonModule gives us access the ngIf and so on.
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

// if you use something in the module you need to import there,
// the things are not exchanged between the modules.

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AuthModule {}
