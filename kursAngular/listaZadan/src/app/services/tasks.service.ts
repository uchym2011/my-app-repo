import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpService } from './http.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable()
export class TasksService {

  // private tasksList: Array<Task> = [];

  // refaktoryzacja, mozemy sie pozbyć poniewaz mamy propertke isDone
  // private tasksDone: Array<Task> = [];


  private tasksListObs = new BehaviorSubject<Array<Task>>([]);
  // private tasksDoneObs = new BehaviorSubject<Array<Task>>([]);

  constructor(private httpSevice: HttpService, private angularFire: AngularFireAuth) {

    angularFire.authState.subscribe(user => {
      if (user) {
        this.init();
      } else {
        this.tasksListObs.next([]);
      }
    });

    /*    const tasksList =
         [
         { name: 'Nauka Angulara', created: new Date().toLocaleString(), isDone: false },
         { name: 'Nauka TypeScript', created: new Date().toLocaleString(), isDone: false },
         { name: 'Ogladanie Gry o Tron', created: new Date().toLocaleString(), isDone: false },
         { name: 'Ogladanie The Walking Dead', created: new Date().toLocaleString(), end: new Date().toLocaleString(),  isDone: true },
         { name: 'Budowa Serwera NAS', created: new Date().toLocaleString(), end: new Date().toLocaleString(), isDone: true}
         ];

       // wrzucmay nasza liste wypełniona danymi
       this.tasksListObs.next(tasksList); */
  }

  init(){
    this.httpSevice.getTasks().subscribe(list => {
      this.tasksListObs.next(list);
    });
}

  add(task: Array<Task>) {
    // dodajemy do listy
    // this.tasksList.push(task);

    // propagujemy
    // przy wrzucaniu zadania do naszej listy musimy tez obsluzyc .taskListObs
    // this.tasksListObs.next(this.tasksList);

    const list = this.tasksListObs.getValue().concat(task);
    this.tasksListObs.next(list);
  }

  remove(task: Task) {
    const list = this.tasksListObs.getValue().filter(e => e !== task);
    // po każdym elemencie się kręcimy (po całej liście) i oznaczamy każdy element jako e i sprawdzamy
    // czy ten element jest różny od tego z parametru który przychodzi
    // jeśli warunek będzie zwróci true to filter zachowa ten element, a jeśli nie to go odrzuci
    // zachowane elementy tworzą nową tablice, więc metoda zwróci nową listę

    // przy usuwaniu zadania z naszej listy musimy tez obsluzyc .taskListObs że coś sie zmieniło
    this.tasksListObs.next(list);
  }

  done(task: Task) {
    // this.tasksDone.push(task);
    // this.remove(task);

    // przy konczeniu zadania z naszej listy musimy tez obsluzyc .taskDoneObs że coś sie zmieniło
    // this.tasksDoneObs.next(this.tasksDone);
    task.end = new Date().toLocaleString();
    task.isDone = 1;
    const list = this.tasksListObs.getValue();

    // metoda next rozpropagowuje w subjectach ze cos sie zmienilo
    this.tasksListObs.next(list);
  }

  // brakuje nam jeszcze metod dostepu do tych Subjectow
  // zwracamy jako Observalble abyśmy mogli subskrybować
  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

  /*   getTasksDoneObs(): Observable<Array<Task>> {
      return this.tasksDoneObs.asObservable();
    } */

  saveTaskInDB() {
    this.httpSevice.saveTasks(this.tasksListObs.getValue());
  }

}
