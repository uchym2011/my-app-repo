import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { Project } from "src/app/models/project";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit {
  project: Project;
  constructor(private projectsService: ProjectsService) {
    projectsService
      .getProjects()
      .subscribe(project => (this.project = project[0]));
  }

  ngOnInit() {}
}
