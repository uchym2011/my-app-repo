import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AuthService } from '../auth/auth.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  addFormProject: FormGroup;

  constructor(private tasksService: TasksService,private authService: AuthService) { }

  ngOnInit() {
    this.addFormProject = this.initForm();
  }

  initForm() {
    return new FormGroup({
      name: new FormArray([new FormControl('Nowa nazwa projektu', Validators.required)]),
      description: new FormArray([new FormControl('Opis')]),
      endDate: new FormArray([new FormControl(null)])
    });
  }

  addProject() {
    const projectList = this.createProjectList();
    // w serwisie taksService zrobić add dla projektow
    this.tasksService.addProject(projectList);
    debugger;
    this.addFormProject = this.initForm();
  }

  createProjectList() {
    const projectList = new Array<Project>();

    const nameArr = <[string]>this.addFormProject.get('name').value;
    const descriptionArr = <[string]>this.addFormProject.get('description').value;
    const endDateArr = <[string]>this.addFormProject.get('endDate').value;

    for (var _i = 0; _i < nameArr.length; _i++) {
      const project = {
                                projectid: null,
                                name: nameArr[_i],
                                created: new Date().toLocaleString(),
                                description: descriptionArr[_i],
                                status: 'P',
                                userId: this.authService.user.uid,
                                endDate: endDateArr[_i]
      };
      projectList.push(project);
    }
    debugger;
    return projectList;
  }

}
