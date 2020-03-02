import { Component, OnInit, Input } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task";

@Component({
  selector: "app-done-task",
  templateUrl: "./done-task.component.html",
  styleUrls: ["./done-task.component.scss"]
})
export class DoneTaskComponent implements OnInit {
  // @Input()
  tasksDone: Array<Task> = [];

  constructor(private tasksService: TasksService) {
    console.log("Wykonuję done-task.component.ts constructor #1");
    this.tasksService.getTasksListObs().subscribe((tasks: Array<Task>) => {
      this.tasksDone = tasks.filter(t => t.isDone === 1);
    });
  }

  ngOnInit() {}
}
