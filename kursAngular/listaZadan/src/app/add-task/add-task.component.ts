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

  addForm2: FormGroup;

  constructor(private tasksService: TasksService,private authService: AuthService) {
    console.log('Wykonuję add-task.component.ts construktor()');
   }

  newTask: string;



  /**
  * @Output()
  * emitTask = new EventEmitter<string>();
  */

 add2() {
  console.log('Wykonuję add-task.component.ts add2() #1');
  console.log('Wykonuję add-task.component.ts add2() #2' + this.addForm2);
  const taskList = this.createTaskList();
  this.tasksService.add(taskList);
  this.addForm2 = this.initForm2();
  //console.log(this.addForm);
  /**   this.tasksList.push(this.newTask);
    console.log(this.tasksList);
    this.newTask = '';*/

  //this.emitTask.emit(this.newTask);
  //this.tasksService.add(task);
  //this.newTask = '';

}

  add() {
    console.log('Wykonuję add-task.component.ts add() #1');
    console.log('Wykonuję add-task.component.ts add() #2' + this.addForm);
    const taskList = this.createTaskList();
    this.tasksService.add(taskList);
    this.addForm = this.initForm();
    console.log('Wykonuję add-task.component.ts add() #3' + this.addForm);
    /**   this.tasksList.push(this.newTask);
      console.log(this.tasksList);
      this.newTask = '';*/

    //this.emitTask.emit(this.newTask);
    //this.tasksService.add(task);
    //this.newTask = '';

  }

  ngOnInit() {

    // Tworzymy listę kontrolek
    // drugi formularz

    console.log('Wykonuję add-task.component.ts ngOnInit() #1');

    this.addForm2 = this.initForm2();

    this.addForm = this.initForm();
  }

  initForm() {
    console.log('Wykonuję add-task.component.ts initForm() #1');
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, Validators.required)]),
      priority: new FormArray([new FormControl("Temat")])
    });
  }

  initForm2() {
    console.log('Wykonuję add-task.component.ts initForm2() #1');
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, Validators.required)]),
      priority: new FormArray([new FormControl('1')])
    });
  }

  createTaskList() {
    console.log('Wykonuję add-task.component.ts createTaskList() #1');
    const tasksList = new Array<Task>();

    const tasksArr = <[string]>this.addForm2.get('taskName').value; //pobieramy talbice tasków

    const priorArr = <[number]>this.addForm2.get('priority').value; //pobieramy priorytety

    // w petli dla każdego taskName pobieramy taski.
/*     tasksArr.forEach(taskName => {
      const task = { name: taskName, userId: this.authService.user.uid, created: new Date().toLocaleString(), isDone: 0 , priority: 1};
      tasksList.push(task);
    }); */

    for (var _i = 0; _i < tasksArr.length; _i++) {
      const task = {id: null, userId: this.authService.user.uid, name: tasksArr[_i], created: new Date().toLocaleString(), end: null, isDone: 0, priority: priorArr[_i] };
      console.log('Wykonuję add-task.component.ts createTaskList() #2 [task] =' + task);
      tasksList.push(task);
    }

    return tasksList;
  }

  addField() {
    console.log('Wykonuję add-task.component.ts addField() #1');
    const arr = <FormArray>this.addForm.get('taskName');
    arr.push(new FormControl(null, Validators.required));
  }

  addField2() {
    console.log('Wykonuję add-task.component.ts addField() #2');
    const arr = <FormArray>this.addForm2.get('taskName');
    arr.push(new FormControl(null, Validators.required));

    const arr2 = <FormArray>this.addForm2.get('priority');
    arr2.push(new FormControl('1'));
  }

}
