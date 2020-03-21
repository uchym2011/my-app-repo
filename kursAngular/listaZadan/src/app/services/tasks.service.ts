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
  private projectsListObs = new BehaviorSubject<Array<Project>>([]);
  private tasksUserObs = new BehaviorSubject<Array<UserDB>>([]);

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
  }

  init() {
    this.httpSevice.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
    });

    this.httpSevice.getProjectsUsers().subscribe(list => {
      this.projectsListObs.next(list);
    });
  }

  add(task: Array<Task>) {
    const list = this.tasksListObs.getValue().concat(task);
    this.tasksListObs.next(list);
  }

  remove(task: Task) {
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
    return this.projectsListObs.asObservable();
  }

  saveTaskInDB() {
    this.httpSevice.saveTasks(this.tasksListObs.getValue());
  }
}
