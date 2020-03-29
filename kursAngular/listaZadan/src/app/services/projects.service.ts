import { Injectable } from "@angular/core";
import { Project } from "../models/project";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  initialProject: Project = {
    projectid: 0,
    name: "Kupno Lamborgini",
    created: new Date(),
    description: "Na pewno mi się uda!",
    status: 'B',
    userId: 'test',
    endDate: new Date() //,tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
  };
  projects: Array<Project> = [
    {
      projectid: 1,
      name: "Kupno Lamborgini",
      created: new Date(),
      description: "Na pewno mi się uda!",
      status: 'N',
      userId: 'test',
      endDate: new Date() //, tasks: ["Task 1", "Task 2", "Task 3", "Task 4"]
    }
  ];
  projectsObs = new BehaviorSubject<Array<Project>>(this.projects);
  constructor() {}

  getProjects(): Observable<Array<Project>> {
    return this.projectsObs.asObservable();
  }
}
