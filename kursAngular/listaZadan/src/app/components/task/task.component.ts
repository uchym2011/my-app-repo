import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  @Input() project;
  @Output() taskClicked: EventEmitter<any> = new EventEmitter();

  activeTask = false;
  constructor() {}

  ngOnInit() {
    console.log("task KOMPONENT WJEŻDZA NA BAZEE!");
  }

  test(taskData) {
    this.activeTask = true;
    this.taskClicked.emit(taskData);
  }
}
