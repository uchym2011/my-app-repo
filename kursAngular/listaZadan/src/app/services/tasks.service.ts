import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  merge,
  Subject,
  combineLatest,
} from "rxjs";
import { Task } from "../models/task";
import { HttpService } from "./http.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

import { User as UserDB } from "../models/user";
import { Project } from "../models/project";
import { map, withLatestFrom, tap, startWith, concatMap } from "rxjs/operators";
import { isNgTemplate } from "@angular/compiler";

@Injectable()
export class TasksService {
  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  public projectsListObs = new BehaviorSubject<Array<Project>>([]);

  private tasksUserObs = new BehaviorSubject<Array<UserDB>>([]);

  public projectListService: Array<Project> = [];

  //!  MY
  private findTextSubject$: Subject<string> = new Subject();
  public findTextAction$ = this.findTextSubject$.asObservable();

  private findProjectSubject$: Subject<string> = new Subject();
  public findProjectAction$ = this.findProjectSubject$.asObservable();

  dailyTasks$ = combineLatest(this.getTasksListObs(), this.getProjects$).pipe(
    map(([tasks, projects]) =>
      tasks.filter(
        (task) =>
          task.projectid ===
          projects.find((item) => item.name === "Bieżący").projectid
      )
    )
  );

  //  ZRÓB TAK ABY FILTROWANA LISTA WYŚWIETLAŁA SIĘ DOMYŚLNIE

  findDailyTasks$ = this.findTextAction$.pipe(
    withLatestFrom(this.dailyTasks$),
    map(([findText, tasks]) =>
      tasks.filter((task) => task.name.includes(findText))
    )
  );

  filteredTasks$ = combineLatest(
    this.dailyTasks$,
    this.findDailyTasks$.pipe(startWith([]))
  ).pipe(map(([daily, filtered]) => (filtered.length ? filtered : daily)));

  // *
  // * PROJECTS
  //  *

  getProjects$ = this.httpSevice.getInitProject$;

  findProjects$ = this.findProjectAction$.pipe(
    withLatestFrom(this.getProjects$),
    map(([findText, projects]) =>
      projects.filter((project) => project.name.includes(findText))
    )
  );

  filteredProjects$ = combineLatest(
    this.getProjects$,
    this.findProjects$.pipe(startWith([]))
  ).pipe(map(([daily, filtered]) => (filtered.length ? filtered : daily)));

  constructor(
    private httpSevice: HttpService,
    private angularFire: AngularFireAuth
  ) {
    angularFire.authState.subscribe((user) => {
      if (user) {
        this.init();
      } else {
        this.tasksListObs.next([]);
      }
    });

    console.log(
      "tasks.serive.ts contructor user: " +
        this.angularFire.auth.currentUser.uid
    );
  }

  init() {
    this.httpSevice.getTasks().subscribe((list) => {
      console.log("list: ", list);
      this.tasksListObs.next(list);
    });

    this.getProjectsListObs().subscribe((project: Array<Project>) => {
      console.log(project);
      this.projectListService = project;
      ///debugger;
    });
  }

  add(task: Array<Task>) {
    console.log(task);
    const list = this.tasksListObs.getValue().concat(task);
    this.tasksListObs.next(list);
  }

  addProject(project: Array<Project>) {
    console.log("Wykonuję tasks.service.ts addProject #1");
    //this.saveNewProjectInDB(project).subscribe(value => console.log("UNIKATOWE TEKSTY"));

    this.httpSevice.saveProject(project).subscribe((value) => {
      this.httpSevice.getProjectsUsersOnly().subscribe((list) => {
        this.projectsListObs.next(list);
        //debugger;
      });
    });

    //debugger;

    //const example = this.httpSevice.saveProject(project).pipe(merge(this.httpSevice.getProjectsUsers()));
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
  // METODA POBIERA INICJALNY PROJEKT "BIEŻACE"
  getProjectsListObs(): Observable<Array<Project>> {
    this.httpSevice.getProjectsUsers().subscribe((list) => {
      // console.log("getProjectsListObs: ", list);
      this.projectsListObs.next(list);
    });

    return this.projectsListObs.asObservable();
  }

  saveTaskInDB() {
    this.httpSevice.saveTasks(this.tasksListObs.getValue());
  }

  saveNewProjectInDB(project: Array<Project>) {
    this.httpSevice.saveProject(project);
  }

  // !!

  //  ?
  emitSearchingValue(value: string) {
    this.findTextSubject$.next(value);
  }

  findProject(value: string) {
    this.findProjectSubject$.next(value);
  }
}

// TODO: spraawdz czy działa porpawnie wszystko dla taskow i projektow
// ! Panel boczny (details musi się dopbrze wykonywać po klijknęciu w task)
//  TODO pomyśl jak można zrobi aby nawigacja dziala dla projektow po kliknieciu
// TODO zacznij poprawiac czyli refaktor
//  TODO rob rwd
