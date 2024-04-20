import {Component, OnInit} from '@angular/core';
import { Task } from '../shared/task';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TaskService} from "../shared/task.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title: string = 'Nova Tarefa';

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const id = this.activateRouted.snapshot.paramMap.get('id'); //pegar na rota atual o prametro especificado na rota
    console.log("ID edição:"+id+":");
    if (id) {
      const taskAux: Task | undefined= this.taskService.getById(parseInt(id));
      console.log("INIT FORM:"+JSON.stringify(taskAux));
      if(taskAux){
        this.task = taskAux;
        this.title = 'Alterando tarefa';
      }
    }
  }

  onSubmit(){
//    console.log(this.task.description);
    this.taskService.save(this.task);
    this.router.navigate(['']);
  }

}

