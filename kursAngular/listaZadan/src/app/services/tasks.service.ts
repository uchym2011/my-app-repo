import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable()
export class TasksService {

  private tasksList: Array<Task> = [];
  private tasksDone: Array<Task> = [];

  private tasksListObs = new BehaviorSubject<Array<Task>>([]);
  private tasksDoneObs = new BehaviorSubject<Array<Task>>([]);

  constructor() {
    this.tasksList =
      [
      { name: 'Nauka Angulara', created: new Date().toLocaleString(), isDone: false },
      { name: 'Nauka TypeScript', created: new Date().toLocaleString(), isDone: false },
      { name: 'Ogladanie Gry o Tron', created: new Date().toLocaleString(), isDone: false },
      { name: 'Budowa Serwera NAS', created: new Date().toLocaleString(), isDone: false }
      ];

    // wrzucmay nasza liste wypełniona danymi
    this.tasksListObs.next(this.tasksList);
  }

  add(task: Task) {
    this.tasksList.push(task);

    // przy wrzucaniu zadania do naszej listy musimy tez obsluzyc .taskListObs
    this.tasksListObs.next(this.tasksList);
  }

  remove(task: Task) {
    this.tasksList = this.tasksList.filter(e => e !== task);
    // po każdym elemencie się kręcimy (po całej liście) i oznaczamy każdy element jako e i sprawdzamy
    // czy ten element jest różny od tego z parametru który przychodzi
    // jeśli warunek będzie zwróci true to filter zachowa ten element, a jeśli nie to go odrzuci
    // zachowane elementy tworzą nową tablice, więc metoda zwróci nową listę

    // przy usuwaniu zadania z naszej listy musimy tez obsluzyc .taskListObs że coś sie zmieniło
    this.tasksListObs.next(this.tasksList);
  }

  done(task: Task) {
    this.tasksDone.push(task);
    this.remove(task);

    // przy konczeniu zadania z naszej listy musimy tez obsluzyc .taskDoneObs że coś sie zmieniło
    this.tasksDoneObs.next(this.tasksDone);
  }

  // brakuje nam jeszcze metod dostepu do tych Subjectow
  // zwracamy jako Observalble abyśmy mogli subskrybować
  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

  getTasksDoneObs(): Observable<Array<Task>> {
    return this.tasksDoneObs.asObservable();
  }

}
