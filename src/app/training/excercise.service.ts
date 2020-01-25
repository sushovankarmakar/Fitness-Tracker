import { Excercise } from "./excercise.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

// this service where we manage all the excercies we know
// as well as our completed and canceled excercies

@Injectable()
export class ExcerciseService {
  excerciseChanged = new Subject<Excercise>();

  excercisesChanged = new Subject<Excercise[]>();

  // private availableExcercises: Excercise[] = [
  //   { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
  //   { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
  //   { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
  //   { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  // ];
  private availableExcercises: Excercise[] = [];

  private runningExcercise: Excercise;

  private excercisesHistoryList: Excercise[] = []; //storing all completed or canceled excercises

  // getAvailableExcercise() {
  //   // slice method will create a real copy of the array and return it.
  //   return this.availableExcercises.slice();
  // }

  constructor(private db: AngularFirestore) {}

  fetchAvailableExcercise() {
    this.db
      .collection("availableExcercises")
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
      .subscribe((exercises: Excercise[]) => {
        this.availableExcercises = exercises;
        this.excercisesChanged.next([...this.availableExcercises]);
      });
  }

  startExcercise(selectedId: string) {
    const selectedExcercise = this.availableExcercises.find(
      excercise => excercise.id === selectedId
    );
    this.runningExcercise = selectedExcercise;

    this.excerciseChanged.next({ ...this.runningExcercise }); // emitting an event
  }

  completeExcercise() {
    this.excercisesHistoryList.push({
      ...this.runningExcercise,
      date: new Date(),
      state: "completed"
    }); // stroing the completed excercise in the history with date and state

    this.runningExcercise = null;
    this.excerciseChanged.next(null); // this means we got no running excercise.

    console.log(this.excercisesHistoryList);
  }

  cancelExcercise(progress: number) {
    this.excercisesHistoryList.push({
      ...this.runningExcercise,
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    }); // stroing the completed excercise in the history with date and state

    this.runningExcercise = null;
    this.excerciseChanged.next(null);

    console.log(this.excercisesHistoryList);
  }

  getRunningExcercise() {
    return { ...this.runningExcercise };
  }

  getExcercisesHistoryList() {
    return this.excercisesHistoryList.slice();
  }
}
