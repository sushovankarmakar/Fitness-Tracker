import { Excercise } from "./excercise.model";
import { Subject } from "rxjs/Subject";

// this service where we manage all the excercies we know
// as well as our completed and canceled excercies

export class ExcerciseService {
  excerciseChanged = new Subject<Excercise>();

  private availableExcercises: Excercise[] = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
    { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  ];

  private runningExcercise: Excercise;

  private excercisesHistoryList: Excercise[] = []; //storing all completed or canceled excercises

  getAvailableExcercise() {
    // slice method will create a real copy of the array and return it.
    return this.availableExcercises.slice();
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
