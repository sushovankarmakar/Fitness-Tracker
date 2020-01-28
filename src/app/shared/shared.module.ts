import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; // CommonModule gives us access the ngIf,ngFor and so on.
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule]

  // by default, a module keeps its imports and declarations to itself,
  // but if we add exports it actually shares it with any other modules
  // that imports this module.
})
export class SharedModule {}
