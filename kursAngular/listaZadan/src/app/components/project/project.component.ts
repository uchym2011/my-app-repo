import { Component, OnInit, Input } from "@angular/core";
import { Project } from "src/app/models/project";
import { Router } from "@angular/router";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  @Input() project;

  constructor(private router: Router) {}

  ngOnInit() {}

  openTasks() {
    this.router.navigate(["desktopApp/projects", this.project.projectId]);
  }
}
