import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Task } from "../models/task";
import { HttpService } from "./http.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

import { User as UserDB } from "../models/user";
import { Project } from "../models/project";

@Injectable()
export class TasksService {
  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  public projectsListObs = new BehaviorSubject<Array<Project>>([]);

  private tasksUserObs = new BehaviorSubject<Array<UserDB>>([]);

  public projectListService: Array<Project> = [];

  constructor(
    private httpSevice: HttpService,
    private angularFire: AngularFireAuth
  ) {
    console.log("Wykonuję tasks.service.ts constructor #1");

    angularFire.authState.subscribe(user => {
      if (user) {
        this.init();
      } else {
        this.tasksListObs.next([]);
      }
    });

    console.log('tasks.serive.ts contructor user: ' + this.angularFire.auth.currentUser.uid );

    /*    const tasksList =
         [
         { name: 'Nauka Angulara', created: new Date().toLocaleString(), isDone: false },
         { name: 'Nauka TypeScript', created: new Date().toLocaleString(), isDone: false },
         { name: 'Ogladanie Gry o Tron', created: new Date().toLocaleString(), isDone: false },
         { name: 'Ogladanie The Walking Dead', created: new Date().toLocaleString(), end: new Date().toLocaleString(),  isDone: true },
         { name: 'Budowa Serwera NAS', created: new Date().toLocaleString(), end: new Date().toLocaleString(), isDone: true}
         ];

       // wrzucmay nasza liste wypełniona danymi
       this.tasksListObs.next(tasksList); */

  }

  init() {
    this.httpSevice.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
    });

    const projectListBB: Array<Project> =
    [
     {
       name:"Bieżący",
       description:"Bieżący projekt",
       status:"B",
       userId: this.angularFire.auth.currentUser.uid,
       endDate: null
     }
    ];
    console.log('logiii ' + projectListBB);

    const lista = this.projectsListObs.getValue().concat(projectListBB);
    this.projectsListObs.next(lista);
    console.log('dodaje project init ' + projectListBB);


    this.httpSevice.getProjectsUsers().subscribe(list => {
      this.projectsListObs.next(list);
    });

     this.getProjectsListObs()
        .subscribe((project: Array<Project>) => {
        this.projectListService = project;
        ///debugger;
      });


    /* TABELA_USERS NIE KASOWAC PRZYKLAD
    console.log('Wykonuję tasks.service.ts init #2 gerUser');
    this.httpSevice.getUser().subscribe(userdb => {
      this.tasksUserObs.next(userdb);
    }); */

  }

  add(task: Array<Task>) {
    const list = this.tasksListObs.getValue().concat(task);
    this.tasksListObs.next(list);
  }

  addProject(project: Array<Project>) {
    console.log("Wykonuję tasks.service.ts add #1");
    // dodajemy do listy
    // this.tasksList.push(task);

    // propagujemy
    // przy wrzucaniu zadania do naszej listy musimy tez obsluzyc .taskListObs
    // this.tasksListObs.next(this.tasksList);

    const list = this.projectsListObs.getValue().concat(project);
    this.projectsListObs.next(list);
  }

  remove(task: Task) {

    console.log("Wykonuję tasks.service.ts remove #1");
    task.isDone = -1;
    const list = this.tasksListObs.getValue();
    this.tasksListObs.next(list);
  }

  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = 1;
    const list = this.tasksListObs.getValue();
    this.tasksListObs.next(list);
  }
  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

  getProjectsListObs(): Observable<Array<Project>> {

    console.log("Wykonuję tasks.service.ts getProjectsListObs #1");
    // this.init();

    this.httpSevice.getProjectsUsers().subscribe(list => {
      this.projectsListObs.next(list);
      ///debugger;
    });

    return this.projectsListObs.asObservable();
  }

  saveTaskInDB() {
    this.httpSevice.saveTasks(this.tasksListObs.getValue());
  }
}
