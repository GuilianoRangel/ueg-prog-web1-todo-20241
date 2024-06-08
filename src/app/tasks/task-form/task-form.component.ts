import {Component, OnInit} from '@angular/core';
import { Task } from '../shared/task';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TaskService} from "../shared/task.service";
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogMessageOkComponent} from "../../core/dailog-message-ok/dialog-message-ok.component";
import {MatOption, MatSelect} from "@angular/material/select";
import {Category} from "../shared/category";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title: string = 'Nova Tarefa';

  private dialogRef!: MatDialogRef<any>;
  categories!: Category[];

  constructor(
    private activateRouted: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
    this.categories = activateRouted.snapshot.data['categoriesData']
  }

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

        this.showMessage("Item salvo com sucesso!");


        this.router.navigate(['']);
      }, error => {
        console.log("Erro" + JSON.stringify(error));
        this.showMessage("Erro ao Salvar-!");
      });

  }

  private showMessage(message: string) {
    this.dialogRef = this.dialog.open(DialogMessageOkComponent, {
      minWidth: "200px",
      minHeight: "100px",
      disableClose: true,
      data: message
    });
    this.dialogRef.afterClosed().subscribe(value => {
      console.log("Botão fechar acionado");
    })
  }
}

