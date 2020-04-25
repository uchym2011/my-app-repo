import { Injectable } from "@angular/core";
import { Project } from "../models/project";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  initialProject: Project = {
    projectId: 0,
    name: "Kupno Lamborgini",
    created: new Date(),
    description: "Na pewno mi się uda!",
    status: true,
    userId: 1,
    endDate: new Date(),
    tasks: [
      {
        title: "Task 1",
        description: "Zrobie jutro po południu",
        finishDate: `${new Date(+2)}`,
        created: new Date(),
        id: 11,
      },
      {
        title: "Task 2",
        description: "Zrobie za tydzień",
        finishDate: new Date(+3),
        created: new Date(),
        id: 12,
      },
      {
        title: "Task 3",
        description: "Zrobie może dziś",
        finishDate: new Date(+10),
        created: new Date(),
        id: 13,
      },
      {
        title: "Task 4",
        description: "Po godzinach po trochu",
        finishDate: new Date(+10),
        created: new Date(),
        id: 14,
      },
      {
        title: "Mieć wszystko",
        description: "Nie od razu, ale za rok",
        finishDate: new Date(+11),
        created: new Date(),
        id: 15,
      },
      {
        title: "Mieć wszystko juz teraz",
        description: "Za  5 dni i 5 nocy",
        finishDate: new Date(+8),
        created: new Date(),
        id: 16,
      },
    ],
  };
  projects: Array<Project> = [
    {
      projectId: 0,
      name: "Kupno Lamborgini",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    },
    {
      projectId: 1,
      name: "Dodanie pierwszego posta na bloga",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    },
    {
      projectId: 2,
      name: "Bieganie 10km",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    },
    {
      projectId: 3,
      name: "kupno projektora",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    },
    {
      projectId: 4,
      name: "Zwiedzanie Azji",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
    },
  ];
  projectsObs = new BehaviorSubject<Array<Project>>(this.projects);
  initialProjecObs = new BehaviorSubject<Project>(this.initialProject);

  templateProject: Project = {
    projectId: 0,
    name: "",
    created: new Date(),
    description: "",
    status: true,
    userId: 0,
    endDate: new Date(),
    tasks: [],
  };
  constructor() {}

  getProjects(): Observable<Array<Project>> {
    return this.projectsObs.asObservable();
  }

  getInitialProject(): Observable<Project> {
    return this.initialProjecObs.asObservable();
  }

  addTask(task: string) {
    const taskObj = {
      title: `${task}`,
      description: "Zrobie jutro po południu",
      finishDate: `${new Date(+2)}`,
      created: new Date(),
    };
    const tasks = this.initialProjecObs.value.tasks;
    tasks.push(taskObj);
  }

  changeTask(changed: any) {
    const tasks = this.initialProjecObs.value.tasks;
    const index = tasks.findIndex((task) => task.id === changed.id);
    let matchedTask = { ...tasks[index] };
    matchedTask = {
      ...matchedTask,
      finishDate: changed.finishDate,
      description: changed.description,
    };

    tasks.splice(index, 1, matchedTask);
  }

  addProject(title: string) {
    const projects = this.projectsObs.value;
    this.templateProject.name = title;
    projects.push(this.templateProject);
  }
}
