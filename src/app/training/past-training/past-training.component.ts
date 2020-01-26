import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Exercise } from "../exercise.model";
import { ExerciseService } from "../exercise.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-past-training",
  templateUrl: "./past-training.component.html",
  styleUrls: ["./past-training.component.css"]
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ["date", "name", "calories", "duration", "state"];
  dataSource = new MatTableDataSource<Exercise>(); // exercise is a kind of type which we have to pass

  // MatTableDataSource is an object which allows material table to connect

  private exchangedSubscription: Subscription;

  // ViewChild gives us a way of getting access to find elements in our template in the typescript file.
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    //this.dataSource.data = this.exerciseService.getExercisesHistoryList();

    console.log("Going to fetch");
    this.exerciseService.fetchExercisesHistoryList();

    this.exchangedSubscription = this.exerciseService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
        console.log("Fetch");
      }
    );
  }

  // ngAfterViewInit method is executed once the view done rendering and initializing
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // MatTableModule doesn't include sorting, pagenation and filtering mechanism.
    // We have to add these seperate modules.
  }

  ngOnDestroy() {
    this.exchangedSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // MatTable will concatenate all the values of in a row and then search for our filtered string
    // there in the long string it has created.
    // We should provide a string which is trimmed and all lowercase because angular will also
    // put its long string into lowercase.
  }
}

// Filtering for the data table just works.
// But why does it work?
// Why can we enter "bur" and we find "Burpees"? Why can we enter "0" and we find all entries with "0.1" in them?
// Here's how the default filtering algorithm works: It (= Angular Material Data Table) concatenates
// all row values to a single string AND transforms this string to lowercase.
// If you row data is:
// Burpees 0.1 3
// the filtering string would be burpees0.13
// If you then enter "Bur" , it'll match this with this string and search for any occurrences.
// That's why we should transform our filtering text to lowercase.
// If you don't want the default behavior, you can define your own filtering logic by setting the filterPredicate
// property instead of the filter property.
// The filterPredicate  property takes a function as a value which in turn takes two arguments:
// The data object (representing the data of one row) and the filtering string.
// You can then return true in the function if you find that it should match.
