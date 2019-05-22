import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TodoTaskComponent implements OnInit {

  // komentujemy bo juz nie potrzebujemy otrzymywać z komponentu nadrzednego, tylko mamy to w serwisie
  //@Input()
  tasksList = [];

/*   @Output()
  emitDone = new EventEmitter<string>();

  @Output()
  emitRemove = new EventEmitter<string>(); */


  constructor(private tasksService: TasksService) {
    // musimy tutaj zainicjalizować listeZadan
    // jak zasubskrybujemy będa wysłane do nas tasks
    // i do tej zmiennej przypisujemy to co do nas przyszło
    this.tasksService.getTasksListObs().subscribe((tasks: Array<string>) => {
      this.tasksList = tasks;
    })
  }

  ngOnInit() {
  }

  remove(task: string) {
    //this.emitRemove.emit(task);
    this.tasksService.remove(task);
  }

  done(task: string) {
    //this.emitDone.emit(task);
    this.tasksService.done(task);
  }

  getColor(): string{
    return this.tasksList.length > 4 ? 'red' : 'green';
  }


}
