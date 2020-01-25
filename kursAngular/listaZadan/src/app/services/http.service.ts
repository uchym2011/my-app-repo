import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB = 'http://localhost:3001/tasks';
  //readonly URL_DB = 'http://uchym.ddns.net:3001/tasks';
  // readonly param = new HttpParams().set('apiKey', '');
  readonly param = new HttpParams().append('userId','1');

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('Wykonuję contruktor getTasks()');
     this.getTasks();
   }

   getParams(): string {

     const uid = this.authService.user.uid;
     console.log('getParams UID2 = '+ uid);
     return uid;
   }

  getTasks(): Observable<Array<Task>> {
    console.log('Wykonuję getTasks()');
        this.http.get(this.URL_DB).subscribe(tasks => {
      console.log(tasks);
    });
    return this.http.get<Array<Task>>(this.URL_DB + '/' + this.getParams());
  }

  saveTasks(list: Array<Task>) {
    console.log('Wykonuję saveTasks()');
    //console.log(JSON.stringify(list));

    this.http.put(this.URL_DB, list).subscribe(data => {
      console.log('dane ' + data);
    });

  }
}
