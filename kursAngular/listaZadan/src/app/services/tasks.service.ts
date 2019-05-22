import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService {

  private tasksList: Array<string> = [];
  private tasksDone: Array<string> = [];

  private tasksListObs = new BehaviorSubject<Array<string>>([]);
  private tasksDoneObs = new BehaviorSubject<Array<string>>([]);

  constructor() {
    this.tasksList = ['Nauka Angulara', 'Gotowanie grochówki', 'Zrobienie kawy', 'Zakupy'];

    // wrzucmay nasza liste wypełniona danymi
    this.tasksListObs.next(this.tasksList);
  }

  add(task: string) {
    this.tasksList.push(task);

    // przy wrzucaniu zadania do naszej listy musimy tez obsluzyc .taskListObs
    this.tasksListObs.next(this.tasksList);
  }

  remove(task: string) {
    this.tasksList = this.tasksList.filter(e => e !== task);
    // po każdym elemencie się kręcimy (po całej liście) i oznaczamy każdy element jako e i sprawdzamy
    // czy ten element jest różny od tego z parametru który przychodzi
    // jeśli warunek będzie zwróci true to filter zachowa ten element, a jeśli nie to go odrzuci
    // zachowane elementy tworzą nową tablice, więc metoda zwróci nową listę

    // przy usuwaniu zadania z naszej listy musimy tez obsluzyc .taskListObs że coś sie zmieniło
    this.tasksListObs.next(this.tasksList);
  }

  done(task: string) {
    this.tasksDone.push(task);
    this.remove(task);

    // przy konczeniu zadania z naszej listy musimy tez obsluzyc .taskDoneObs że coś sie zmieniło
    this.tasksDoneObs.next(this.tasksDone);
  }

  // brakuje nam jeszcze metod dostepu do tych Subjectow
  // zwracamy jako Observalble abyśmy mogli subskrybować
  getTasksListObs(): Observable<Array<string>> {
    return this.tasksListObs.asObservable();
  }

  getTasksDoneObs(): Observable<Array<string>> {
    return this.tasksDoneObs.asObservable();
  }

}
