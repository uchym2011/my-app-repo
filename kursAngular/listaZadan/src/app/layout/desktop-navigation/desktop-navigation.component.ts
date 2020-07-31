import { Component, OnInit } from "@angular/core";
import { TasksService } from "src/app/services/tasks.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-desktop-navigation",
  templateUrl: "./desktop-navigation.component.html",
  styleUrls: ["./desktop-navigation.component.scss"],
})
export class DesktopNavigationComponent implements OnInit {
  dailyProjectId: number;

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.dailyProjctId$.subscribe((id) => {
      this.dailyProjectId = id;
      console.log("id desktop project", id);
    });
  }

  openDailyTasks() {
    // * Za pomocą id przekazywanego łączy się z odpowiednim taskiem w swoim projeckie
    this.router.navigate(["desktopApp/projects", this.dailyProjectId]);
  }
}
