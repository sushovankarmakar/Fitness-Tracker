import { Exercise } from "./exercise.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { UIService } from "../shared/ui.service";

// this service where we manage all the exercies we know
// as well as our completed and canceled exercies

@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();

  exercisesChanged = new Subject<Exercise[]>();

  // this finishedExercisesChanged event will be emitted when finished list is changed or update.
  finishedExercisesChanged = new Subject<Exercise[]>();

  // private availableExercises: Exercise[] = [
  //   { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
  //   { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
  //   { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
  //   { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  // ];
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise;
  private firebaseSubscriptionsList: Subscription[] = [];

  // getAvailableExercise() {
  //   // slice method will create a real copy of the array and return it.
  //   return this.availableExercises.slice();
  // }

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercise() {
    this.uiService.loadingStateChanged.next(true);

    this.firebaseSubscriptionsList.push(
      // pushing the below subscription into firebaseSubscription array.
      this.db
        .collection("availableExercises")
        .snapshotChanges()
        .pipe(
          map(docArray => {
            //docArray is an array of object on which we are applying the javascript map operator
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as {})
              };
            });
          })
        )
        // even though we reloaded the new-training-component and therefore re-executed the
        // fetchAvailableExercise() method we only get one log. So this subscription replaces itself.
        .subscribe(
          (exercises: Exercise[]) => {
            //console.log(exercises);
            this.uiService.loadingStateChanged.next(false);

            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          }
          //, error => {
          //   //console.log(error);
          // }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.db
    //   .doc("availableExercises/" + selectedId)
    //   .update({ lastSelected: new Date() }); // working with a single document

    const selectedExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
    this.runningExercise = selectedExercise;

    this.exerciseChanged.next({ ...this.runningExercise }); // emitting an event
  }

  completeExercise() {
    // this.exercisesHistoryList.push({
    //   ...this.runningExercise,
    //   date: new Date(),
    //   state: "completed"
    // }); // stroing the completed exercise in the history with date and state

    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date().toLocaleString(),
      state: "completed"
    }); // stroing the completed exercise in the firestore database

    this.runningExercise = null;
    this.exerciseChanged.next(null); // this means we got no running exercise.

    //console.log(this.finishedExercisesHistoryList);
  }

  cancelExercise(progress: number) {
    // this.exercisesHistoryList.push({
    //   ...this.runningExercise,
    //   duration: this.runningExercise.duration * (progress / 100),
    //   calories: this.runningExercise.calories * (progress / 100),
    //   date: new Date(),
    //   state: "cancelled"
    // }); // stroing the completed exercise in the history with date and state

    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date().toLocaleString(),
      state: "cancelled"
    }); // stroing the completed exercise in the firestore database

    this.runningExercise = null;
    this.exerciseChanged.next(null);

    //console.log(this.finishedExercisesHistoryList);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  // getExercisesHistoryList() {
  //   return this.finishedExercisesHistoryList.slice();
  // }

  fetchExercisesHistoryList() {
    this.firebaseSubscriptionsList.push(
      // pushing the below subscription into firebaseSubscription array.
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            // here we are emitting a value whenever we get finishedExercisesHistoryList from the server
            this.finishedExercisesChanged.next(exercises);
          }
          //, error => {
          //   //console.log(error);
          // }
        )
    );

    console.log("Inside the fetch");

    // valueChanges() returns the array of document values without the id of the document.
    //private finishedExercisesHistoryList: Exercise[] = []; //storing all completed or canceled exercises
  }

  cancelFirebaseSubscriptions() {
    console.log(this.firebaseSubscriptionsList);
    console.log("------------");
    this.firebaseSubscriptionsList.forEach(
      subscription => subscription.unsubscribe(),
      console.log("---------- CANCEL --------")
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    const data = JSON.parse(JSON.stringify(exercise));
    this.db.collection("finishedExercises").add(data);

    //finishedExercises collection will store all the finished and completed data.
    //add() returns a promise where we can handle the success case and we can catch any errors too.
  }
}
