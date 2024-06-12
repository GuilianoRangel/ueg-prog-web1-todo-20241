import {Injectable} from '@angular/core';
import {Task} from './task';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http!: HttpClient;

  private url!: string;
  constructor(http: HttpClient ) {
    this.url = environment.apiUrl+"/task";
    this.http = http;
  }

  getAll(): Observable<Task[]>{
    console.log("Inicio getAll");
    return this.http.get<Task[]>(`${this.url}`);
  }

  getById(id: number): Observable<Task> {
    console.log("Inicio getAll");
    return this.http.get<Task>(`${this.url}/${id}`);
  }
  save(task: Task):Observable<Task>{
    var retorno :Observable<Task>;
    if(task.id) {
      console.log("Alterar:"+JSON.stringify(task))
      retorno = this.http.put<Task>(`${this.url}/${task.id}`, task);
    }else{
      console.log("Incluir:"+JSON.stringify(task))
      retorno = this.http.post<Task>(`${this.url}`, task);
    }
    return retorno;
  }

  delete(id: number): Observable<Task>{
    console.log("Alterar:"+id)
    return this.http.delete<Task>(`${this.url}/${id}`);
  }

}
