import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ExerciseService } from "./exercise.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    console.log("Inside Training Component");
    this.exerciseSubscription = this.exerciseService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
          console.log("Inside Training Component true");
        } else {
          console.log("Inside Training Component false");
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
