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
  projects: Array<Project>;
  projectsObs = new BehaviorSubject<Array<Project>>([this.initialProject]);
  constructor() {}

  getProjects(): Observable<Array<Project>> {
    return this.projectsObs.asObservable();
  }
}
