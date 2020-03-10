import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { Project } from "src/app/models/project";

// ! ZROB GLOBALNE STYLE
// ! LOCAL STORAGE DLA LOGOWANIA

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project>;
  constructor(private projectsService: ProjectsService) {
    projectsService
      .getProjects()
      .subscribe(project => (this.projects = project));
  }

  ngOnInit() {}
}
