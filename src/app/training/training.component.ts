import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ExcerciseService } from "./excercise.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  excerciseSubscription: Subscription;

  constructor(private excerciseService: ExcerciseService) {}

  ngOnInit() {
    console.log("Inside Training Component");
    this.excerciseSubscription = this.excerciseService.excerciseChanged.subscribe(
      excercise => {
        if (excercise) {
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
    this.excerciseSubscription.unsubscribe();
  }
}
