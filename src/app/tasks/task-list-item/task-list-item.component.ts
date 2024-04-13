import {Component, Input} from '@angular/core';
import { Task } from '../shared/task';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input()
  task!: Task;

}
