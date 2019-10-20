import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  newTask: string;

  /**
  * @Output()
  * emitTask = new EventEmitter<string>();
  */

  add() {

    const task: Task = {name: this.newTask, created: new Date().toLocaleString(), isDone: 0 };

    /**   this.tasksList.push(this.newTask);
      console.log(this.tasksList);
      this.newTask = '';*/

    //this.emitTask.emit(this.newTask);
    this.tasksService.add(task);
    this.newTask = '';
  }

  ngOnInit() {
  }

}
