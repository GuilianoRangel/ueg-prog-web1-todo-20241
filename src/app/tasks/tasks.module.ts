import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskListComponent} from "./task-list/task-list.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    TaskFormComponent,
    TaskListComponent,
  ]
})
export class TasksModule { }
