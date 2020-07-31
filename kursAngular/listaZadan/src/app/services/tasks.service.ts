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
  getProjects$ = this.httpSevice.getInitProject$.pipe(
    tap((v) => console.log("PROJECT LIST:", v))
  );

  private findTextSubject$: Subject<string> = new Subject();
  public findTextAction$ = this.findTextSubject$.asObservable();

  private findProjectSubject$: Subject<string> = new Subject();
  public findProjectAction$ = this.findProjectSubject$.asObservable();

  private projectIdForTasksSubject: Subject<number> = new Subject();
  public projectIdForTasksAction = this.projectIdForTasksSubject.asObservable();
  // * STARA DZIAŁAJĄCA WERSJA
  // dailyTasks$ = combineLatest(
  //   this.getTasksListObs(),
  //   this.getProjectsListObs()
  // ).pipe(
  //   map(([tasks, projects]) =>
  //     tasks.filter(
  //       (task) =>
  //         task.projectid ===
  //         projects.find((item) => item.name === "Bieżący").projectid
  //     )
  //   )
  // );
  dailyTasks$ = combineLatest(
    this.getTasksListObs(),
    this.getProjectsListObs()
  );

  dailyProjctId$ = this.getProjectsListObs().pipe(
    tap((v) => console.log("PROJECT BIEZ ID1", v)),
    map(
      (projects) =>
        projects.find((project) => project.name === "Bieżący").projectid
    ),
    tap((v) => console.log("PROJECT BIEZ ID2", v))
  );

  filteredTasks$ = combineLatest(
    this.getTasksListObs()
    // TODO UZUPEŁNIĆ FUNKCJE POZWLAJĄCĄ FILTROWANIE DANYCH
    // TODO - W TAKSs component filtorwanie jest listy po subskrybcji router parametru --- id projektu szukanego
    //  TODO - po wyfiltrowaniu należy założy funkcje która filtruje
    // this.findDailyTasks$.pipe(startWith([]))
  ).pipe(
    map(
      // ([tasksA, filtered]) => (filtered.length ? filtered : tasksA)
      ([tasks, filtered]) => tasks
    ),
    tap((v) => console.log("FINAL FILTERED TASKS", v))
  );

  findProjects$ = this.findProjectAction$.pipe(
    withLatestFrom(this.getProjectsListObs()),
    map(([findText, projects]) =>
      projects.filter((project) => project.name.includes(findText))
    )
  );

  filteredProjects$ = combineLatest(
    this.getProjectsListObs(),
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

  changeProjectId(id: number) {
    this.projectIdForTasksSubject.next(id);
  }

  init() {
    this.httpSevice.getTasks().subscribe((list) => {
      console.log("list: ", list);
      this.tasksListObs.next(list);
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
      });
    });
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
    return this.httpSevice.getProjectsUsers();
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
// * jest paere błed ów po wybraniu prajeku wczytuje się tylko biezący
// * nowy task i wysypuja sie bledy zacznij refaktor od tego
// TODO zacznij poprawiac czyli refaktor
//  TODO rob rwd
