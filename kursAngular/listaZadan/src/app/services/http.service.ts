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

  constructor(private http: HttpClient, private authService: AuthService) {
    //console.log('Wykonuję http.service.ts constructor #1');
    //this.getTasks();
    //this.getUser();
  }
  readonly URL_DB = "http://localhost:3001/tasks";
  //readonly URL_DB = 'http://uchym.ddns.net:3001/tasks';

  // readonly param = new HttpParams().set('apiKey', '');
  readonly param = new HttpParams().append("userId", "1");

  private projectListB: Array<Project> = [];

  getParams(): string {
    const uid = this.authService.user.uid;
    //console.log('Wykonuję http.service.ts hetParams #1 [uid] = ' + uid);
    return uid;
  }

  getTasks(): Observable<Array<Task>> {
    console.log('Wykonuję http.service.ts getTasks #1');
    this.http.get(this.URL_DB + "/" + this.getParams()).subscribe(tasks => {
      console.log('TASKS LISTS:' + tasks[0].name);
    });
    return this.http.get<Array<Task>>(this.URL_DB + "/" + this.getParams());
  }

  getUser(): Observable<Array<User>> {
    console.log('Wykonuję http.service.ts :::::::::: getUser #1');
    this.http.get("http://localhost:3001/user/" + this.getParams()).subscribe(user => {
      console.log(user);
      //alert(user[0].firstName + ' ' + user[0].surname);
    });
    return this.http.get<Array<User>>("http://localhost:3001/user/" + this.getParams());
  }


  getProjectsUsers(): Observable<Array<Project>> {
    console.log('Wykonuję http.service.ts :::::::::: getProjectsUsers #1');
    // ZROBIC WSTAWIANIE BIEZACEGO
    //this.http.put
  const uid = this.getParams();

    const projectListBB =
    [
     {
       name:"Bieżący",
       description:"Bieżący projekt",
       status:"B",
       userId: uid,
       endDate: "2020-04-01 12:00:00"
     }
    ];
    console.log('log' + projectListBB);

    this.http.put("http://localhost:3001/projects/" + uid, projectListBB).subscribe(data => {
      console.log('getProjectsUsers + [dane] = ' + data);

      this.http.get("http://localhost:3001/projects/" + uid).subscribe(project => {
        console.log('PROJECT ARRAY : ' + project[0].name);
        //alert(user[0].firstName + ' ' + user[0].surname);
      });

    });

    return this.http.get<Array<Project>>("http://localhost:3001/projects/" + this.getParams());
  }

    saveTasks(list: Array<Task>) {
    console.log('Wykonuję http.service.ts saveTasks #1');
    //console.log(JSON.stringify(list));

    this.http.put(this.URL_DB, list).subscribe(data => {
      alert(data["message"]);
      console.log('Wykonuję http.service.ts saveTasks #2 + [dane] = ' + JSON.stringify(data["message"]) + ' ');
    });
  }

  insertUser(user: User) {
    this.http.put("http://localhost:3001/user/", user).subscribe(data => {
      console.log('insertUser' + data);
    });
  }

}
