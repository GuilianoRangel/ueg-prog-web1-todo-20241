import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TaskService} from "../shared/task.service";
import {Task} from "../shared/task";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TaskListItemComponent} from "../task-list-item/task-list-item.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgClass,
    TaskListItemComponent,
    NgIf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit  {
  tasks: Task[] = [];

  constructor(
    public taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
    console.log('tasks', JSON.stringify(this.tasks));
    console.log('tasks', this.tasks);
    this.tasks[0].completed = true;
  }

}
