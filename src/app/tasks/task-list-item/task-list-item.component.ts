import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../shared/task';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../shared/task.service";
import {MessageService} from "../../core/message.service";

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

  @Output()
  deleteClick: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(public taskService: TaskService,
              public messageService: MessageService) {
  }

  onCompletedCheckChange(task: Task){
    console.log("onChange", task);
    this.taskService.save(task).subscribe({next:value => {

      },
      error:err => {
        alert('Erro: '+err.error);
        console.log(err);
        //task.completed = false;
      }
    });
  }

  delete(task: Task) {
    this.deleteClick.emit(task);
  }

}
