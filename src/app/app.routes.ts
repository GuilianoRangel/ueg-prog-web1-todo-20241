import {Routes} from '@angular/router';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskFormComponent} from "./tasks/task-form/task-form.component";
import {TaskResolve} from "./tasks/shared/task.resolve";

export const routes: Routes = [
  {
    path: '', component: TaskListComponent,
    resolve: {
      tasksData: TaskResolve,
    },
  },
  {path: 'new', component: TaskFormComponent},
  {path: 'edit/:id', component: TaskFormComponent}

];
