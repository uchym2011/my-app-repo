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
    endDate: new Date()
  };
  projects: Array<Project> = [
    {
      projectId: 0,
      name: "Kupno Lamborgini",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date()
    },
    {
      projectId: 1,
      name: "Dodanie pierwszego posta na bloga",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date()
    },
    {
      projectId: 2,
      name: "Bieganie 10km",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date()
    },
    {
      projectId: 3,
      name: "kupno projektora",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date()
    },
    {
      projectId: 4,
      name: "Zwiedzanie Azji",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: true,
      userId: 0,
      endDate: new Date()
    }
  ];
  projectsObs = new BehaviorSubject<Array<Project>>(this.projects);
  constructor() {}

  getProjects(): Observable<Array<Project>> {
    return this.projectsObs.asObservable();
  }
}
