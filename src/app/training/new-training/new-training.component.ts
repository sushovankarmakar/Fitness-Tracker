import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { ExcerciseService } from "../excercise.service";
import { Excercise } from "../excercise.model";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  //@Output() trainingStart = new EventEmitter<void>();
  excercises: Excercise[] = [];

  //excercises: Observable<any>;
  excerciseSubscription: Subscription;

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

    //this.excercises = this.db.collection("availableExcercises").valueChanges();
    this.db
      .collection("availableExcercises")
      .snapshotChanges()
      .subscribe(result => {
        console.log(result);
      });
    //document snapshot is a way to get the metadata, the id.

    // this.db
    //   .collection("availableExcercises")
    //   .snapshotChanges()
    //   .subscribe(result => {
    //     for (const res of result) {
    //       console.log(res.payload.doc.id);
    //       console.log(res.payload.doc.data());
    //     }
    //   });

    // here code is removed to the fetchAvailableExcercise() method of excercise.service.ts file.

    //snapshotChanges() gives us the obserables on which we can use map() operator.
    // .subscribe(result => {
    //   console.log(result); // result is the an array objects which exacly like the excercise model
    // });

    this.excerciseSubscription = this.excerciseService.excercisesChanged.subscribe(
      excercises => (this.excercises = excercises)
    );
    this.excerciseService.fetchAvailableExcercise();
  }

  onStartTraining(form: NgForm) {
    //this.trainingStart.emit();
    this.excerciseService.startExcercise(form.value.excercise);
  }

  ngOnDestroy() {
    this.excerciseSubscription.unsubscribe();
  }
}
