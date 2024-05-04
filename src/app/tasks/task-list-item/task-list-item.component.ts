import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../shared/task';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../shared/task.service";

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    FormsModule
  ],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input()
  task!: Task;
  @Output()
  itemChange: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(public taskService: TaskService) {
  }

  onCompletedCheckChange(task: Task){
    console.log("onChange", task);
    this.taskService.save(task);
  }

  delete(task: Task) {
    this.taskService.delete(task.id).subscribe({
      next: value => {
        alert("Excluído com sucesso!");
        this.itemChange.emit(value);
      },
      error: error => {
        alert(`Erro ao excluir:${error.error}`);
      }
    });
  }

}
