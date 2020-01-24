import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ExcerciseService } from "../excercise.service";
import { Excercise } from "../excercise.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart = new EventEmitter<void>();
  excercises: Excercise[] = [];

  constructor(private excerciseService: ExcerciseService) {}

  ngOnInit() {
    this.excercises = this.excerciseService.getAvailableExcercise();
  }

  onStartTraining(form: NgForm) {
    //this.trainingStart.emit();
    this.excerciseService.startExcercise(form.value.excercise);
  }
}
