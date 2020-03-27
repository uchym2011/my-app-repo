import { Injectable } from "@angular/core";
import { Project } from "../models/project";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  initialProject: Project = {
    projectId: 0,
    name: "Kupno Lamborgini",
    created: new Date(),
    description: "Na pewno mi się uda!",
    status: true,
    userId: 0,
    endDate: new Date(),
    tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
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
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
    },
    {
      projectId: 1,
      name: "Dodanie pierwszego posta na bloga",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
    },
    {
      projectId: 2,
      name: "Bieganie 10km",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
    },
    {
      projectId: 3,
      name: "kupno projektora",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
    },
    {
      projectId: 4,
      name: "Zwiedzanie Azji",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date(),
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
    }
  ];
  projectsObs = new BehaviorSubject<Array<Project>>(this.projects);
  initialProjecObs = new BehaviorSubject<Project>(this.initialProject);
  constructor() {}

  getProjects(): Observable<Array<Project>> {
    return this.projectsObs.asObservable();
  }

  getInitialProject(): Observable<Project> {
    return this.initialProjecObs.asObservable();
  }

  //  JAK ZA POMOCĄ OBSERWABLA WPAKOWAĆ WARTOŚĆ DO DANEGO OBIEKTU DO TABLICY
  // JESTEM W TRKACIE DODAWANIA Z INPUTA WYSUWAJĄCEGO SIĘ, TEKSTU
  //  KTÓRY NA PIERWSZY STRZAŁ ZASILI TABLCE TASKÓW!
  addTask(task) {
    const tasks = this.initialProjecObs.value.tasks;
    tasks.push(task);
    // this.initialProjecObs.next(tasks);
  }
}
