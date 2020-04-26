import { Injectable } from "@angular/core";
import { Project } from "../models/project";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  initialProject: Project = {
    projectId: 0,
    title: "Sprawy Bieżące",
    created: new Date(),
    description: "Na pewno mi się uda!",
    status: true,
    userId: 1,
    finishDate: new Date(),
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
      projectId: 1,
      title: "Kupno Lamborgini",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      finishDate: new Date(),
      tasks: [
        {
          title: "Lambo: Task 1",
          description: "Zrobie jutro po południu",
          finishDate: `${new Date(+2)}`,
          created: new Date(),
          id: 11,
        },
        {
          title: "Lambo: Task 2",
          description: "Zrobie za tydzień",
          finishDate: new Date(+3),
          created: new Date(),
          id: 12,
        },
        {
          title: "Lambo: Task 3",
          description: "Zrobie może dziś",
          finishDate: new Date(+10),
          created: new Date(),
          id: 13,
        },
        {
          title: "Lambo: Task 4",
          description: "Po godzinach po trochu",
          finishDate: new Date(+10),
          created: new Date(),
          id: 14,
        },
        {
          title: "Lambo: Mieć wszystko",
          description: "Nie od razu, ale za rok",
          finishDate: new Date(+11),
          created: new Date(),
          id: 15,
        },
        {
          title: "Lambo: Mieć wszystko juz teraz",
          description: "Za  5 dni i 5 nocy",
          finishDate: new Date(+8),
          created: new Date(),
          id: 16,
        },
      ],
    },
    {
      projectId: 2,
      title: "Dodanie pierwszego posta na bloga",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 1,
      finishDate: new Date(),
      tasks: [
        {
          title: "Task 1",
          description: "Zrobie jutro po południu",
          finishDate: `${new Date(+2)}`,
          created: new Date(),
          id: 11,
        },
        {
          title: "Blog: Task 2",
          description: "Zrobie za tydzień",
          finishDate: new Date(+3),
          created: new Date(),
          id: 12,
        },
        {
          title: "Blog: Task 3",
          description: "Zrobie może dziś",
          finishDate: new Date(+10),
          created: new Date(),
          id: 13,
        },
        {
          title: "Blog: Task 4",
          description: "Po godzinach po trochu",
          finishDate: new Date(+10),
          created: new Date(),
          id: 14,
        },
        {
          title: "Blog: Mieć wszystko",
          description: "Nie od razu, ale za rok",
          finishDate: new Date(+11),
          created: new Date(),
          id: 15,
        },
        {
          title: "Blog: Mieć wszystko juz teraz",
          description: "Za  5 dni i 5 nocy",
          finishDate: new Date(+8),
          created: new Date(),
          id: 16,
        },
      ],
    },
    {
      projectId: 3,
      title: "Bieganie",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      finishDate: new Date(),
      tasks: [
        {
          title: "Bieganie: Task 1",
          description: "Zrobie jutro po południu",
          finishDate: `${new Date(+2)}`,
          created: new Date(),
          id: 11,
        },
        {
          title: "Bieganie: Task 2",
          description: "Zrobie za tydzień",
          finishDate: new Date(+3),
          created: new Date(),
          id: 12,
        },
        {
          title: "Bieganie: Task 3",
          description: "Zrobie może dziś",
          finishDate: new Date(+10),
          created: new Date(),
          id: 13,
        },
        {
          title: "Bieganie: Task 4",
          description: "Po godzinach po trochu",
          finishDate: new Date(+10),
          created: new Date(),
          id: 14,
        },
        {
          title: "Bieganie: Mieć wszystko",
          description: "Nie od razu, ale za rok",
          finishDate: new Date(+11),
          created: new Date(),
          id: 15,
        },
        {
          title: "Bieganie: Mieć wszystko juz teraz",
          description: "Za  5 dni i 5 nocy",
          finishDate: new Date(+8),
          created: new Date(),
          id: 16,
        },
      ],
    },
    {
      projectId: 4,
      title: "kupno projektora",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      finishDate: new Date(),
      tasks: [
        {
          title: "Projektor: Task 1",
          description: "Zrobie jutro po południu",
          finishDate: `${new Date(+2)}`,
          created: new Date(),
          id: 11,
        },
        {
          title: "Projektor: Task 2",
          description: "Zrobie za tydzień",
          finishDate: new Date(+3),
          created: new Date(),
          id: 12,
        },
        {
          title: "Projektor: Task 3",
          description: "Zrobie może dziś",
          finishDate: new Date(+10),
          created: new Date(),
          id: 13,
        },
        {
          title: "Projektor: Task 4",
          description: "Po godzinach po trochu",
          finishDate: new Date(+10),
          created: new Date(),
          id: 14,
        },
        {
          title: "Projektor: Mieć wszystko",
          description: "Nie od razu, ale za rok",
          finishDate: new Date(+11),
          created: new Date(),
          id: 15,
        },
        {
          title: "Projektor: Mieć wszystko juz teraz",
          description: "Za  5 dni i 5 nocy",
          finishDate: new Date(+8),
          created: new Date(),
          id: 16,
        },
      ],
    },
    {
      projectId: 5,
      title: "Zwiedzanie Azji",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      finishDate: new Date(),
      tasks: [
        {
          title: "Azja: Task 1",
          description: "Zrobie jutro po południu",
          finishDate: `${new Date(+2)}`,
          created: new Date(),
          id: 11,
        },
        {
          title: "Azja: Task 2",
          description: "Zrobie za tydzień",
          finishDate: new Date(+3),
          created: new Date(),
          id: 12,
        },
        {
          title: "Azja: Task 3",
          description: "Zrobie może dziś",
          finishDate: new Date(+10),
          created: new Date(),
          id: 13,
        },
        {
          title: "Azja: Task 4",
          description: "Po godzinach po trochu",
          finishDate: new Date(+10),
          created: new Date(),
          id: 14,
        },
        {
          title: "Azja: Mieć wszystko",
          description: "Nie od razu, ale za rok",
          finishDate: new Date(+11),
          created: new Date(),
          id: 15,
        },
        {
          title: "Azja: Mieć wszystko juz teraz",
          description: "Za  5 dni i 5 nocy",
          finishDate: new Date(+8),
          created: new Date(),
          id: 16,
        },
      ],
    },
  ];
  projectsObs = new BehaviorSubject<Array<Project>>(this.projects);
  initialProjecObs = new BehaviorSubject<Project>(this.initialProject);

  templateProject: Project = {
    projectId: 0,
    title: "",
    created: new Date(),
    description: "",
    status: true,
    userId: 0,
    finishDate: new Date(),
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
    this.templateProject.title = title;
    projects.push(this.templateProject);
  }
}
