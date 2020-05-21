import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Task } from "../models/task";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

import { User } from "../models/user";

import { Project } from "../models/project";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  readonly URL_DB = "http://localhost:3001/tasks";

  readonly param = new HttpParams().append("userId", "1");

  private projectListB: Array<Project> = [];

  pageLink = "http://localhost:3001";

  getInitProject$ = this.http.get<Array<Project>>(
    `${this.pageLink}/projects/${this.authService.user.uid}`
  );

  constructor(private http: HttpClient, private authService: AuthService) {}

  getParams(): string {
    return this.authService.user.uid;
  }

  getTasks(): Observable<Array<Task>> {
    this.http
      .get(this.URL_DB + "/" + this.getParams())
      .subscribe((tasks) => {});
    return this.http.get<Array<Task>>(this.URL_DB + "/" + this.getParams());
  }

  getUser(): Observable<Array<User>> {
    console.log("Wykonuję http.service.ts :::::::::: getUser #1");
    this.http
      .get("http://localhost:3001/user/" + this.getParams())
      .subscribe((user) => {
        console.log(user);
      });
    return this.http.get<Array<User>>(
      "http://localhost:3001/user/" + this.getParams()
    );
  }

  getProjectsUsers(): Observable<Array<Project>> {
    console.log("Wykonuję http.service.ts :::::::::: getProjectsUsers #1");
    // ZROBIC WSTAWIANIE BIEZACEGO
    //this.http.put
    const uid = this.getParams();

    const projectListBB = [
      {
        name: "Bieżący",
        description: "Bieżący projekt",
        status: "B",
        userId: uid,
        endDate: "2020-04-28 12:00:00",
      },
    ];

    this.http.put("http://localhost:3001/projects/" + uid, projectListBB);
    return this.http.get<Array<Project>>(
      "http://localhost:3001/projects/" + this.getParams()
    );
  }

  // tylko pobranie projektow bez inicjalizacji biezacego
  getProjectsUsersOnly(): Observable<Array<Project>> {
    console.log(
      "%%% Wykonuję http.service.ts :::::::::: getProjectsUsersTest #1"
    );

    /*     this.http.get("http://localhost:3001/projects/" + uid).subscribe(project => {
      console.log('PROJECT ARRAY : ' + project[0].name);
    }); */

    return this.http.get<Array<Project>>(
      "http://localhost:3001/projects/" + this.getParams()
    );
  }

  saveTasks(list: Array<Task>) {
    this.http.put(this.URL_DB, list).subscribe((data) => {
      console.log(list);
    });
  }

  saveProject(project: Array<Project>): Observable<any> {
    return this.http.post(
      "http://localhost:3001/projects/" + this.getParams(),
      project
    );
  }

  insertUser(user: User) {
    this.http.put("http://localhost:3001/user/", user).subscribe((data) => {
      console.log("insertUser" + data);
    });
  }
}
