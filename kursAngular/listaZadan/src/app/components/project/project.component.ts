import { Component, OnInit, Input } from "@angular/core";
import { Project } from "src/app/models/project";
import { TasksService } from "src/app/services/tasks.service";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  @Input() project;

  public projectList: Array<Project>;

  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  openTasks() {
    // * Za pomocą id przekazywanego łączy się z odpowiednim taskiem w swoim projeckie
    this.router.navigate(["desktopApp/projects", this.project.projectid]);
  }
}
