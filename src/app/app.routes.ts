import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import {TaskFormComponent} from "./tasks/task-form/task-form.component";

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'new', component: TaskFormComponent },
  { path: 'edit/:id', component: TaskFormComponent }

];
