import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Todo } from "../todo";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TodoService } from '../todo-service.service';

const ANIMATION_TIME = 300
@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
  animations: [
    trigger('deleteTrigger', [
      state('isNotDeleting', style({ opacity: 1 })),
      state('isDeleting', style({opacity: 0 })),
      transition('isNotDeleting => isDeleting', animate(ANIMATION_TIME))
    ])
  ]
})
export class TodoComponent {

  constructor(private todoService: TodoService) { }

  @Output()
  update = new EventEmitter<Todo>();

  @Output()
  delete = new EventEmitter<Todo>();

  @Input()
  todo: Todo;

  isDeleting = false
  
  deleteMe() {
    this.isDeleting = true
    setTimeout(() => this.delete.emit(this.todo), ANIMATION_TIME + 50)
  }

  updated() {
    this.update.emit(this.todo);
  }

  changeIsDone(event: boolean) {
    this.todo.isDone = event;
    this.updated();
  }
}
