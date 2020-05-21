import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { Project } from "src/app/models/project";
import { TasksService } from "src/app/services/tasks.service";

// ! ZROB GLOBALNE STYLE
// ! LOCAL STORAGE DLA LOGOWANIA

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  projects$ = this.tasksService.filteredProjects$;
  constructor(
    private projectsService: ProjectsService,
    private tasksService: TasksService
  ) {
    // projectsService
    //   .getProjects()
    //   .subscribe((project) => (this.projects = project));
  }

  ngOnInit() {}
}
