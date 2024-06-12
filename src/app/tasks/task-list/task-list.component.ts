import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TaskService} from "../shared/task.service";
import {Task} from "../shared/task";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TaskListItemComponent} from "../task-list-item/task-list-item.component";
import {MessageService} from "../../core/message.service";
import {DataMessageConfirm} from "../../core/data-message-confirm";

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
    public taskService: TaskService,
    public messageService: MessageService,
    route: ActivatedRoute,
  ) {
    this.tasks = route.snapshot.data['tasksData'];
  }

  ngOnInit(): void {
  }

  recarregar() {
    this.tasks = [];
     this.taskService.getAll().subscribe(value => {
      this.tasks = value;
    });
  }

  refresh(task: Task) {
    const taskIndex = this.tasks.findIndex( (value) => value.id == task.id);
    this.tasks.splice(taskIndex, 1);
  }
  delete(task: Task) {

    this.messageService.showMessageConfirm(
      new DataMessageConfirm(
        "Confirmar exclusão",
        "Confirmar",
        () =>{ this.executeDelete(task); },
        "Cancelar",
        () => {console.log("Exclusão cancelada!")}
      ))

  }

  private executeDelete(task: Task) {
    this.taskService.delete(task.id).subscribe({
      next: value => {
        this.refresh(value);
        this.messageService.showMessage("Excluído com sucesso!!!")
      },
      error: error => {
        this.messageService.showMessage(`Erro ao excluir!!:${error.error}`)
      }
    });
  }
}
