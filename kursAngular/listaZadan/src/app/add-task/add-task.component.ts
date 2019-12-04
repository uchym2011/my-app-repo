import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addForm: FormGroup;

  constructor(private tasksService: TasksService,private authService: AuthService) { }

  newTask: string;



  /**
  * @Output()
  * emitTask = new EventEmitter<string>();
  */

  add() {

    const taskList = this.createTaskList();
    this.tasksService.add(taskList);
    this.addForm = this.initForm();

    /**   this.tasksList.push(this.newTask);
      console.log(this.tasksList);
      this.newTask = '';*/

    //this.emitTask.emit(this.newTask);
    //this.tasksService.add(task);
    //this.newTask = '';

  }

  ngOnInit() {

    // Tworzymy listę kontrolek
    this.addForm = this.initForm();

  }

  initForm() {
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, Validators.required)])
    });
  }

  createTaskList() {
    const tasksList = new Array<Task>();

    const tasksArr = <[string]>this.addForm.get('taskName').value; //pobieramy talbice tasków

    // w petli dla każdego taskName pobieramy taski.
    tasksArr.forEach(taskName => {
      const task = { name: taskName, userId: this.authService.user.uid, created: new Date().toLocaleString(), isDone: 0 };
      tasksList.push(task);
    });
    return tasksList;
  }

  addField() {
    const arr = <FormArray>this.addForm.get('taskName');
    arr.push(new FormControl(null, Validators.required));
  }

}
