import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Task } from "../models/task";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  readonly URL_DB = "http://localhost:3001/tasks";
  //readonly URL_DB = 'http://uchym.ddns.net:3001/tasks';

  // readonly param = new HttpParams().set('apiKey', '');
  readonly param = new HttpParams().append("userId", "1");

  constructor(private http: HttpClient, private authService: AuthService/* , private snackBar: MatSnackBarModule */) {
    console.log('Wykonuję http.service.ts constructor #1');
    this.getTasks();
  }

  getParams(): string {
    const uid = this.authService.user.uid;
    console.log('Wykonuję http.service.ts hetParams #1 [uid] = ' + uid);
    return uid;
  }

  getTasks(): Observable<Array<Task>> {
    console.log('Wykonuję http.service.ts getTasks #1');
    this.http.get(this.URL_DB).subscribe(tasks => {
      console.log(tasks);
    });
    return this.http.get<Array<Task>>(this.URL_DB + "/" + this.getParams());
  }

    saveTasks(list: Array<Task>) {
    console.log('Wykonuję http.service.ts saveTasks #1');
    //console.log(JSON.stringify(list));

    this.http.put(this.URL_DB, list).subscribe(data => {
      alert(data["message"]);
      console.log('Wykonuję http.service.ts saveTasks #2 + [dane] = ' + JSON.stringify(data["message"]) + ' ');
    });

  }
}
