import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-todo-task",
  templateUrl: "./todo-task.component.html",
  styleUrls: ["./todo-task.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class TodoTaskComponent implements OnInit {
  // komentujemy bo juz nie potrzebujemy otrzymywać z komponentu nadrzednego, tylko mamy to w serwisie
  // @Input()
  tasksList: Array<Task> = [];
  tasksListPrior: Array<Task> = [];
  tasksListNorm: Array<Task> = [];

  /*   @Output()
  emitDone = new EventEmitter<string>();

  @Output()
  emitRemove = new EventEmitter<string>(); */

  constructor(private tasksService: TasksService) {
    console.log('Wykonuję todo-task.component.ts constructor #1');
    // musimy tutaj zainicjalizować listeZadan
    // jak zasubskrybujemy będa wysłane do nas tasks
    // i do tej zmiennej przypisujemy to co do nas przyszło
  }

  ngOnInit() {
    console.log('Wykonuję todo-task.component.ts ngOnInit #1');
    this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
      // dodajemy slice aby zwrociła nową tą samą tablice ale z nową referencje, wykryje to angular i posortuje
      // mozemy dac pure true przy sortowaniu i jest to bardziej wydajne
      // this.tasksList = tasks.slice();
      // !alert("ds");
      // debugger;
      // ! BEZ METODY FILTER!
      //this.tasksList = tasks.slice();

      this.tasksList = tasks.filter(t => t.isDone == 0);

      this.tasksListPrior = tasks.filter(t => t.isDone == 0 && t.priority == 1);

      this.tasksListNorm = tasks.filter(t => t.isDone == 0 && t.priority < 1);
      //debugger;
      //this.tasksList = tasks.filter(t => t.end === null);
    });



  }

  remove(task: Task) {
    console.log('Wykonuję todo-task.component.ts remove() #1');
    // this.emitRemove.emit(task);
    this.tasksService.remove(task);
  }

  done(task: Task) {
    console.log('Wykonuję todo-task.component.ts done() #1');
    // this.emitDone.emit(task);
    this.tasksService.done(task);
    // task.end = new Date().toLocaleString();
  }

  getColor(): string {
    //console.log('Wykonuję todo-task.component.ts getColor() #1');
    return this.tasksList.length > 4 ? "red" : "green";
  }

  save() {
    console.log('Wykonuję todo-task.component.ts save() #1');
    this.tasksService.saveTaskInDB();

    // this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
    //   // dodajemy slice aby zwrociła nową tą samą tablice ale z nową referencje, wykryje to angular i posortuje
    //   debugger;
    //   // mozemy dac pure true przy sortowaniu i jest to bardziej wydajne
    //   // this.tasksList = tasks.slice();
    //   //this.tasksList = tasks.filter(t => t.end === null);
    // });
  }
}
