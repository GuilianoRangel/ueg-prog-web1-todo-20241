import {Injectable} from '@angular/core';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {id: 1,  description: 'Tarefa 1',  completed: false },
    {id: 2,  description: 'Tarefa 2',  completed: false },
    {id: 3,  description: 'Tarefa 3',  completed: true },
    {id: 4,  description: 'Tarefa 4',  completed: false },
    {id: 5,  description: 'Tarefa 5',  completed: false },
    {id: 6,  description: 'Tarefa 6',  completed: false },
    {id: 7,  description: 'Tarefa 7',  completed: false },
    {id: 8,  description: 'Tarefa 8',  completed: false },
    {id: 9,  description: 'Tarefa 9',  completed: false },
    {id: 10, description: 'Tarefa 10', completed: false },
  ]

  constructor() { }

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
      const lastId = this.tasks[this.tasks.length-1].id;
      task.id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
    }
  }

  delete(id: number){
    const taskIndex = this.tasks.findIndex( (value) => value.id == id);
    this.tasks.splice(taskIndex, 1);
  }

}
