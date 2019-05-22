import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor() { }

  newTask: string;

@Output()
emitTask = new EventEmitter<string>();

  add(){
    /**   this.tasksList.push(this.newTask);
      console.log(this.tasksList);
      this.newTask = '';*/

     this.emitTask.emit(this.newTask);
     this.newTask = '';
  }

  ngOnInit() {
  }

}
