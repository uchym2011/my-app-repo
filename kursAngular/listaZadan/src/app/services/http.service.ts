import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Task } from "../models/task";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

import { User } from "../models/user";

import { Project } from "../models/project";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  readonly URL_DB = "http://localhost:3001/tasks";
  readonly param = new HttpParams().append("userId", "1");

  constructor(private http: HttpClient, private authService: AuthService) {}

  getParams(): string {
    const uid = this.authService.user.uid;
    return uid;
  }

  getTasks(): Observable<Array<Task>> {
    this.http.get(this.URL_DB + "/" + this.getParams()).subscribe(tasks => {});
    return this.http.get<Array<Task>>(this.URL_DB + "/" + this.getParams());
  }

  getUser(): Observable<Array<User>> {
    console.log("Wykonuję http.service.ts :::::::::: getUser #1");
    this.http
      .get("http://localhost:3001/user/" + this.getParams())
      .subscribe(user => {
        console.log(user);
      });
    return this.http.get<Array<User>>(
      "http://localhost:3001/user/" + this.getParams()
    );
  }

  getProjectsUsers(): Observable<Array<Project>> {
    this.http
      .get("http://localhost:3001/projects/" + this.getParams())
      .subscribe(project => {
        console.log("PROJECT ARRAY : " + project[0].name);
      });
    return this.http.get<Array<Project>>(
      "http://localhost:3001/projects/" + this.getParams()
    );
  }

  saveTasks(list: Array<Task>) {
    this.http.put(this.URL_DB, list).subscribe(data => {
      console.log(
        "Wykonuję http.service.ts saveTasks #2 + [dane] = " +
          JSON.stringify(data["message"]) +
          " "
      );
    });
  }

  insertUser(user: User) {
    this.http.put("http://localhost:3001/user/", user).subscribe(data => {
      console.log("insertUser" + data);
    });
  }
}
