import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ExcerciseService } from "../excercise.service";
import { Excercise } from "../excercise.model";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart = new EventEmitter<void>();
  // excercises: Excercise[] = [];

  excercises: Observable<any>;

  constructor(
    private excerciseService: ExcerciseService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    //this.excercises = this.excerciseService.getAvailableExcercise();
    this.db
      .collection("availableExcercises")
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });

    this.excercises = this.db.collection("availableExcercises").valueChanges();
  }

  onStartTraining(form: NgForm) {
    //this.trainingStart.emit();
    this.excerciseService.startExcercise(form.value.excercise);
  }
}
