import { Exercise } from "./exercise.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

// this service where we manage all the exercies we know
// as well as our completed and canceled exercies

@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();

  exercisesChanged = new Subject<Exercise[]>();

  // private availableExercises: Exercise[] = [
  //   { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
  //   { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
  //   { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
  //   { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  // ];
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise;

  private exercisesHistoryList: Exercise[] = []; //storing all completed or canceled exercises

  // getAvailableExercise() {
  //   // slice method will create a real copy of the array and return it.
  //   return this.availableExercises.slice();
  // }

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercise() {
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
      .subscribe((exercises: Exercise[]) => {
        console.log(exercises);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
    this.runningExercise = selectedExercise;

    this.exerciseChanged.next({ ...this.runningExercise }); // emitting an event
  }

  completeExercise() {
    this.exercisesHistoryList.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    }); // stroing the completed exercise in the history with date and state

    this.runningExercise = null;
    this.exerciseChanged.next(null); // this means we got no running exercise.

    console.log(this.exercisesHistoryList);
  }

  cancelExercise(progress: number) {
    this.exercisesHistoryList.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    }); // stroing the completed exercise in the history with date and state

    this.runningExercise = null;
    this.exerciseChanged.next(null);

    console.log(this.exercisesHistoryList);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getExercisesHistoryList() {
    return this.exercisesHistoryList.slice();
  }
}
