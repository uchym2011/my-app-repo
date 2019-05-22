import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'listaZadan';

  newTask: string;
  tasksList: Array<string> = [];
  tasksDone: Array<string> = [];

  add(){
    this.tasksList.push(this.newTask);
    console.log(this.tasksList);
    this.newTask = '';
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
