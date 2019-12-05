import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from "./todo";
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})


export class TodoService {

  
  

  constructor(private http: HttpClient) {}

    getUsers(): Observable<Todo[]> {
      return this.http.get<Todo[]>(`${environment.backUrl}/todos`)
    }

    addTodo(todo: Todo): Observable<Todo>{
        return this.http.post<Todo>(`${environment.backUrl}/todos`,todo)
      }

    removeTodo(todo : Todo): Observable<void>{
      return this.http.delete<void>(`${environment.backUrl}/todos/${todo.id}`)
    }

    updateTodo(todo : Todo): Observable<void>{
      return this.http.put<void>(`${environment.backUrl}/todos/${todo.id}`, todo)
    }
     
   

  // getUsers() {
  //     this.newTodo = this.http.get('http://localhost:3000/todos/1'); 
  //     return this.newTodo
  //   }
   
 


}
