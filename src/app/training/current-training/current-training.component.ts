import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";
import { ExcerciseService } from "../excercise.service";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  //@Output() trainingExit = new EventEmitter();

  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private excerciseService: ExcerciseService
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step =
      (this.excerciseService.getRunningExcercise().duration / 100) * 1000; // here 1000 is 1000 milisecond = 1 second.

    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.excerciseService.completeExcercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        //this.trainingExit.emit();

        this.excerciseService.cancelExcercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
