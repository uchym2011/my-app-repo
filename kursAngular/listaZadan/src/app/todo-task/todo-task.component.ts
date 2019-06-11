import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TodoTaskComponent implements OnInit {

  // komentujemy bo juz nie potrzebujemy otrzymywać z komponentu nadrzednego, tylko mamy to w serwisie
  //@Input()
  tasksList: Array<Task> = [];

/*   @Output()
  emitDone = new EventEmitter<string>();

  @Output()
  emitRemove = new EventEmitter<string>(); */


  constructor(private tasksService: TasksService) {
    // musimy tutaj zainicjalizować listeZadan
    // jak zasubskrybujemy będa wysłane do nas tasks
    // i do tej zmiennej przypisujemy to co do nas przyszło
    this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {

      // dodajemy slice aby zwrociła nową tą samą tablice ale z nową referencje, wykryje to angular i posortuje
      // mozemy dac pure true przy sortowaniu i jest to bardziej wydajne
      this.tasksList = tasks.slice();
    });
  }

  ngOnInit() {
  }

  remove(task: Task) {
    //this.emitRemove.emit(task);
    this.tasksService.remove(task);
  }

  done(task: Task) {
    //this.emitDone.emit(task);
    this.tasksService.done(task);
    task.end = new Date().toLocaleString();
  }

  getColor(): string{
    return this.tasksList.length > 4 ? 'red' : 'green';
  }


}
