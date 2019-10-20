import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB = 'http://localhost:3001/tasks';
  // readonly param = new HttpParams().set('apiKey', '');

  constructor(private http: HttpClient) {
    this.getTasks();
   }

  getTasks(): Observable<Array<Task>> {
       /* this.http.get(this.URL_DB).subscribe(tasks => {
      console.log(tasks);
    }); */
    return this.http.get<Array<Task>>(this.URL_DB);
  }


  saveTasks(list: Array<Task>) {
    console.log(JSON.stringify(list));

    this.http.put(this.URL_DB, list).subscribe(data => {
      console.log('dane ' + data);
    });
  }
}
