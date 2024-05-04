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
      this.taskService.getById(parseInt(id)).subscribe(value => {
        const taskAux = value;
        console.log("INIT FORM:" + JSON.stringify(taskAux));
        if (taskAux) {
          this.task = taskAux;
          this.title = 'Alterando tarefa';
        }
      }, error => {
        console.log("Erro:", JSON.stringify(error));
        alert(`Erro ao buscar o dados:${error.error}`);
      })

    }
  }

  onSubmit(){
//    console.log(this.task.description);
    this.taskService.save(this.task)
      .subscribe(value => {
        console.log("Salvo:", JSON.stringify(value));
        //alert("Salvo com sucesso!");
        this.router.navigate(['']);
      }, error => {
        console.log("Erro" + JSON.stringify(error));
        alert('Erro ao salvar:');
      });

  }

}

