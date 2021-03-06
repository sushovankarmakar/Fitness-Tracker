import {
  Component,
  OnInit,
  //EventEmitter,
  //Output,
  OnDestroy
} from "@angular/core";
import { ExerciseService } from "../exercise.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
//import { map } from "rxjs/operators";
//import { AuthService } from "src/app/auth/auth.service";
import { UIService } from "src/app/shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app.reducer";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];

  //exercises: Observable<any>;
  private exerciseSubscription: Subscription;
  //private loadingSubscription: Subscription;

  //isLoading = true;

  isLoading$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private db: AngularFirestore, //,private authService: AuthService
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
    // this.authService.authChange.subscribe((isAuthenticated: boolean) => {
    //   if (!isAuthenticated) {
    //     this.exerciseSubscription.unsubscribe();
    //   }
    // });
  }

  ngOnInit() {
    //this.exercises = this.exerciseService.getAvailableExercise();
    this.db
      .collection("availableExercises")
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });

    //this.exercises = this.db.collection("availableExercises").valueChanges();
    this.db
      .collection("availableExercises")
      .snapshotChanges()
      .subscribe(result => {
        console.log(result);
      });
    //document snapshot is a way to get the metadata, the id.

    // this.db
    //   .collection("availableExercises")
    //   .snapshotChanges()
    //   .subscribe(result => {
    //     for (const res of result) {
    //       console.log(res.payload.doc.id);
    //       console.log(res.payload.doc.data());
    //     }
    //   });

    // here code is removed to the fetchAvailableExercise() method of exercise.service.ts file.

    //snapshotChanges() gives us the obserables on which we can use map() operator.
    // .subscribe(result => {
    //   console.log(result); // result is the an array objects which exacly like the exercise model
    // });

    console.log("Inside the new training component init");

    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading: boolean) => {
    //     this.isLoading = isLoading; //availableExcercisesList loading is completed, stop showing the mat-spinner
    //   }
    // );

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe(
      exercises => {
        //this.isLoading = false; // availableExcercisesList loading is completed, stop showing the mat-spinner
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.exerciseService.fetchAvailableExercise();

    //this fetchExercises also getting called when "fetch again" button is pressed.
  }

  onStartTraining(form: NgForm) {
    //this.trainingStart.emit();
    this.exerciseService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    // if (this.loadingSubscription) {
    //   this.loadingSubscription.unsubscribe();
    // }
  }
}
