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
  tasks$ = this.tasksService.filteredTasks$;
  // tasks$ = this.tasksService.dailyTasks$;

  constructor(
    private projectsService: ProjectsService,
    private router: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.tasksService
      .getTasksListObs()
      .subscribe((values) => console.log(values));

    this.tasks$.subscribe((v) => console.log("TASKS", v));

    this.router.params.subscribe((params) => {
      this.projectId = +params["projectId"]; // (+) converts string 'id' to a number
      console.log(this.projectId);
      this.projectsService.getProjects().subscribe((projects) => {
        // WYKONUJEMY JEŚLI PRZEKAZALIŚMY PARAMETR DO ROUTERA
        if (this.projectId) {
          // NOWA LISTA DO WYŚWIETLANIA TASKÓW
          [this.project] = projects.filter(
            (project) => project.projectId === this.projectId
          );
          // lISTA DO WYŚWIETLANIA DANYCH W DESCRIPTION PANELU BOCZNYM
          // NIE POTRZEBNE JEST TUTAJ PRZEKAZYWANIE DO TEGO OBIEKTU POKOMBINUJ
          this.taskData = this.project;
          this.activeDetails = true;
        }
      });
      // In a real app: dispatch action to load the details here.
    });
    console.log(this.projectId);
  }

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
