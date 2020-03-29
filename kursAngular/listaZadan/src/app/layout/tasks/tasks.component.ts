import { Component, OnInit, Input } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { Project } from "src/app/models/project";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit {
  project: Project;
  filteredTasks: Array<string> = [];
  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projectsService
      .getInitialProject()
      .subscribe(values => (this.project = values));
  }

  filterList(event) {
    this.filteredTasks = this.project.tasks.filter(
      taskTitle => taskTitle.indexOf(event) > -1
    );
  }
}
