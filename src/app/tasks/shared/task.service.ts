import {Injectable} from '@angular/core';
import {Task} from './task';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http!: HttpClient;

  constructor(http: HttpClient ) {
    this.http = http;
  }

  getAll(): Observable<Task[]>{
    console.log("Inicio getAll");
    return this.http.get<Task[]>("http://localhost:8080/api/v1/task");
  }

  getById(id: number): Observable<Task> {
    console.log("Inicio getAll");
    return this.http.get<Task>(`http://localhost:8080/api/v1/task/${id}`);
  }
  save(task: Task):Observable<Task>{
    var retorno :Observable<Task>;
    if(task.id) {
      console.log("Alterar:"+JSON.stringify(task))
      retorno = this.http.put<Task>(`http://localhost:8080/api/v1/task/${task.id}`, task);
    }else{
      console.log("Incluir:"+JSON.stringify(task))
      retorno = this.http.post<Task>("http://localhost:8080/api/v1/task", task);
    }
    return retorno;
  }

  delete(id: number): Observable<Task>{
    console.log("Alterar:"+id)
    return this.http.delete<Task>(`http://localhost:8080/api/v1/task/${id}`);
  }

}
