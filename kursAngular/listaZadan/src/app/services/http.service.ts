import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly URL_DB = 'http://localhost:3001/tasks';
  // readonly param = new HttpParams().set('apiKey', '');

  constructor(private http: HttpClient) {
    this.getTask();
   }

  getTask() {
    this.http.get(this.URL_DB)
    .subscribe(tasks => {
      console.log(tasks);
    });
  }

  saveTasks(list: Array<Task>) {
    console.log(list);
    console.log(JSON.stringify(list));

    this.http.post(this.URL_DB, list).subscribe(data => {
      console.log(data);
    });
  }
}
