import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./category";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http!: HttpClient;

  private url!: string;
  constructor(http: HttpClient ) {
    this.url = environment.apiUrl+"/category";
    this.http = http;
  }

  getAll(): Observable<Category[]>{
    console.log("Inicio getAll");
    return this.http.get<Category[]>(`${this.url}`);
  }

  getById(id: number): Observable<Category> {
    console.log("Inicio getAll");
    return this.http.get<Category>(`${this.url}/${id}`);
  }
  save(category: Category):Observable<Category>{
    var retorno :Observable<Category>;
    if(category.id) {
      console.log("Alterar:"+JSON.stringify(category))
      retorno = this.http.put<Category>(`${this.url}/${category.id}`, category);
    }else{
      console.log("Incluir:"+JSON.stringify(category))
      retorno = this.http.post<Category>(`${this.url}`, category);
    }
    return retorno;
  }

  delete(id: number): Observable<Category>{
    console.log("Alterar:"+id)
    return this.http.delete<Category>(`${this.url}/${id}`);
  }

}
