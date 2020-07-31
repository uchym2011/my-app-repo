import { Component, OnInit, Input } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { Project } from "src/app/models/project";
import { Task } from "src/app/models/task";
import {
  Observable,
  forkJoin,
  combineLatest,
  BehaviorSubject,
  Subject,
  merge,
  zip,
  iif,
} from "rxjs";

import {
  filter,
  tap,
  map,
  withLatestFrom,
  mergeMap,
  startWith,
  switchMap,
} from "rxjs/operators";

import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  activeDetails = false;
  // In daily tasks mode
  project: Project;
  filteredTasks: Array<string> = [];
  taskData: any; // !DOSTROSUJ TYP
  task = null;
  // NAWIGATION
  projectId: number;

  //  ZRÓB TAK ABY FILTROWANA LISTA WYŚWIETLAŁA SIĘ DOMYŚLNIE
  tasks$ = combineLatest(
    this.tasksService.filteredTasks$,
    this.router.params
  ).pipe(
    map(([tasks, projectId]) =>
      tasks.filter((task) => task.projectid === +projectId.projectId)
    )
  );

  projects$ = this.tasksService.filteredProjects$;

  constructor(
    private projectsService: ProjectsService,
    private router: ActivatedRoute,
    private tasksService: TasksService
  ) {
    console.log("run TASKS");
  }

  ngOnInit() {}

  filterList(event) {
    console.log("clg to:", event);
    const searchingElement = event ? event.toLowerCase() : event;
    // ! ZROBIE TO W SERWISIE
    // this.startSearchingSubject$.next(searchingElement);
    // this.filteredTasks = this.project.tasks.filter(
    //   (task) => task.title.toLowerCase().indexOf(searchingElement) > -1
    // );
  }

  handleDescription(detailsState) {
    this.activeDetails = detailsState;
    console.log("desc");
    this.projectsService
      .getInitialProject()
      .subscribe((project) => ([this.taskData] = project.tasks.slice(-1)));
  }

  test1(taskData) {
    console.log("ddssdsdsd");
    this.activeDetails = false;
    this.taskData = taskData;
    this.activeDetails = true;
  }
}
