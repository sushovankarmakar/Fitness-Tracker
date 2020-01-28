import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
//import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
// import { SignupComponent } from "./auth/signup/signup.component";
// import { LoginComponent } from "./auth/login/login.component";

// import { TrainingComponent } from "./training/training.component";
// import { CurrentTrainingComponent } from "./training/current-training/current-training.component";
// import { NewTrainingComponent } from "./training/new-training/new-training.component";
// import { PastTrainingComponent } from "./training/past-training/past-training.component";
//import { StopTrainingComponent } from "./training/current-training/stop-training.component";

import { WelcomeComponent } from "./welcome/welcome.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";

import { AuthService } from "./auth/auth.service";
import { ExerciseService } from "./training/exercise.service";
import { environment } from "../environments/environment";
import { UIService } from "./shared/ui.service";
import { AuthModule } from "./auth/auth.module";
//import { TrainingModule } from "./training/training.module";  // removed due to lazy loading

@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent,
    // LoginComponent,
    // TrainingComponent,
    // CurrentTrainingComponent,
    // NewTrainingComponent,
    // PastTrainingComponent,
    // StopTrainingComponent
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,

    // AngularFireModule should be in this file cause it initialize the angular fire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireAuthModule,
    AuthModule // each module works standalone
    //TrainingModule  // removed due to lazy loading
  ],
  providers: [AuthService, ExerciseService, UIService],
  // we should always provide our services to the app.module.ts if we plan to use them application wide
  // or if we want to use them as singleton.

  bootstrap: [AppComponent]
  //, entryComponents: [StopTrainingComponent]
})
export class AppModule {}
