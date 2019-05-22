import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'listaZadan';

  tasksList: Array<string> = [];
  tasksDone: Array<string> = [];

  ngOnInit(): void {
    this.tasksList = ['Nauka Angulara','Gotowanie grochówki','Zrobienie kawy','Zakupy'];
  }

  add(task: string){
    this.tasksList.push(task);
  }

  remove(task: string){
    this.tasksList = this.tasksList.filter(e => e !== task);
    // po każdym elemencie się kręcimy (po całej liście) i oznaczamy każdy element jako e i sprawdzamy
    // czy ten element jest różny od tego z parametru który przychodzi
    // jeśli warunek będzie zwróci true to filter zachowa ten element, a jeśli nie to go odrzuci
    // zachowane elementy tworzą nową tablice, więc metoda zwróci nową listę
  }

  done(task: string){
    this.tasksDone.push(task);
    this.remove(task);
  }

}
