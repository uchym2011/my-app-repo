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
import { Project } from "../models/project";

/*TABELA_USERS NIE KASOWAC PRZYKLAD
import { User } from '../models/user';
*/

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

  projectList: Array<Project> = [];

  // TABELA_USERS NIE KASOWAC PRZYKLAD
  //currentUser: Array<User> = [];

  currentUserNew: string;

  /*   @Output()
  emitDone = new EventEmitter<string>();

  @Output()
  emitRemove = new EventEmitter<string>(); */

  constructor(
    private tasksService: TasksService,
    private authService: AuthService
  ) {
    console.log("Wykonuję todo-task.component.ts constructor #1");
    // musimy tutaj zainicjalizować listeZadan
    // jak zasubskrybujemy będa wysłane do nas tasks
    // i do tej zmiennej przypisujemy to co do nas przyszło
  }

  ngOnInit() {
    console.log("Wykonuję todo-task.component.ts ngOnInit #1");
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

      console.log("TASKS LIST: " + this.tasksList);
      //this.tasksList = tasks.filter(t => t.end === null);
    });

    /* TABELA_USERS NIE KASOWAC PRZYKLAD
    this.tasksService.getUserListObs().subscribe((userdb: Array<User>) => {
      this.currentUser = userdb;
    }); */

    this.tasksService
      .getProjectsListObs()
      .subscribe((project: Array<Project>) => {
        this.projectList = project;
        ///debugger;
      });

    console.log("PROJEKT LIST: " + this.projectList);

    console.log(
      "todo-task.component.ts dodane !!!! - " +
        this.authService.user.displayName
    );
    this.currentUserNew = this.authService.user.displayName;
  }

  remove(task: Task) {
    console.log("Wykonuję todo-task.component.ts remove() #1");
    // this.emitRemove.emit(task);
    this.tasksService.remove(task);
  }

  done(task: Task) {
    console.log("Wykonuję todo-task.component.ts done() #1");
    // this.emitDone.emit(task);
    this.tasksService.done(task);
    // task.end = new Date().toLocaleString();
  }

  getColor(): string {
    //console.log('Wykonuję todo-task.component.ts getColor() #1');
    return this.tasksList.length > 4 ? "red" : "green";
  }

  save() {
    console.log("Wykonuję todo-task.component.ts save() #1");
    this.tasksService.saveTaskInDB();

    // this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
    //   // dodajemy slice aby zwrociła nową tą samą tablice ale z nową referencje, wykryje to angular i posortuje
    //   // mozemy dac pure true przy sortowaniu i jest to bardziej wydajne
    //   // this.tasksList = tasks.slice();
    //   //this.tasksList = tasks.filter(t => t.end === null);
    // });
  }
}
