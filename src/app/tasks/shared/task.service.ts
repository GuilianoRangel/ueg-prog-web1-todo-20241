import {Injectable} from '@angular/core';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = []

  constructor() {
    this.loadList()
  }

  getAll(): Task[]{
    return this.tasks;
  }

  getById(id: number) {
    return this.tasks.find((value) => value.id == id);
  }
  save(task: Task){
    if(task.id) {
      const taskArr = this.getById(task.id);
      console.log("Save:"+JSON.stringify(task));
      if(taskArr){
        taskArr.description = task.description;
        taskArr.completed = task.completed;
      }
    }else{
      console.log("Alterar:"+JSON.stringify(task))
      const lastId = this.tasks.length > 0 ?
        this.tasks[this.tasks.length-1].id :
        0;
      task.id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
    }
    this.storeList()
  }

  delete(id: number){
    const taskIndex = this.tasks.findIndex( (value) => value.id == id);
    this.tasks.splice(taskIndex, 1);
    this.storeList()
  }

  private storeList(){
    window.localStorage.setItem('lista-tarefas', JSON.stringify(this.tasks));
  }
  private loadList(){
    const list = window.localStorage.getItem('lista-tarefas');
    if(list){
      this.tasks = JSON.parse(list);
    }
  }


}
