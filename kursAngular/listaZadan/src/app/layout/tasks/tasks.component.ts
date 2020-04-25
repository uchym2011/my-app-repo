import { Component, OnInit, Input } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { Project } from "src/app/models/project";
import { Task } from "src/app/models/task";
import { Observable, forkJoin } from "rxjs";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  activeDetails = false;
  project: Project;
  filteredTasks: Array<string> = [];
  taskData: Array<Task>;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projectsService
      .getInitialProject()
      .subscribe((values) => (this.project = values));
  }

  filterList(event) {
    const searchingElement = event ? event.toLowerCase() : event;
    this.filteredTasks = this.project.tasks.filter(
      (taskTitle) => taskTitle.toLowerCase().indexOf(searchingElement) > -1
    );
  }

  handleDescription(detailsState) {
    this.activeDetails = detailsState;
    console.log("desc");
    this.projectsService
      .getInitialProject()
      .subscribe((project) => ([this.taskData] = project.tasks.slice(-1)));
  }

  test1(taskData) {
    this.activeDetails = false;
    this.taskData = taskData;
    this.activeDetails = true;
  }
}
