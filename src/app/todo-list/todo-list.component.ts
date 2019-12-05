import { Component, OnInit } from "@angular/core";
import { Todo } from "../todo";
import { TodoService } from '../todo-service.service';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];


  newTodo: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.refreshTodos();
  }

  //Pour le tp je doit remplacer le getitem du localstorage par un get a l'api du coté service que j'appelle ici
  //c'est clair ? ET BAH POUR MOI NON PLUS WESH
  private refreshTodos() {
    this.todoService.getUsers().subscribe(
      (todos: Todo[]) => this.todos = todos
      )
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  addTodo() {

    const newTodo: Todo = {
      task: this.newTodo,
      isDone: false
    }

    this.todoService.addTodo(newTodo).subscribe((todo : Todo) => {
      this.todos.push(todo)
    })
  }

  deleteTodo(todo: Todo) {

    this.todoService.removeTodo(todo).subscribe(
      () => {
        this.todos = this.todos.filter(t=> t.id !== todo.id)
      }
    )
  }

  updateTodo(todo: Todo) {

    this.todoService.updateTodo(todo).subscribe()
  }


}
