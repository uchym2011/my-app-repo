import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { ProjectsService } from "src/app/services/projects.service";
import { ManagementIcons } from "src/app/models/ManagementToolIcons";
import { TasksService } from "src/app/services/tasks.service";
import { Project } from "src/app/models/project";
import { AuthService } from "src/app/auth/auth.service";
import { Task } from "src/app/models/task";
import { withLatestFrom, switchMap, tap, filter, map } from "rxjs/operators";
import { Observable, combineLatest } from "rxjs";

@Component({
  selector: "app-management-tools",
  templateUrl: "./management-tools.component.html",
  styleUrls: ["./management-tools.component.scss"],
})
export class ManagementToolsComponent implements OnInit {
  /**
   * Where the component should operate.
   */
  @Input() environment;

  /**
   * Trigger opening description panel
   */
  @Output() activeDescription: EventEmitter<any> = new EventEmitter();

  /**
   * Finder panel state
   */
  state: string[] = [];

  /**
   * Is available finderPanel
   */
  finderPanel = false;

  /**
   * Icons
   */
  icons: ManagementIcons = {
    addition: "fa-plus",
    search: "fa-search",
    sort: "fa-sort-amount-up",
  };

  /**
   * Component mode
   */
  mode: string;

  /**
   * Management tool component form
   */
  form: FormGroup;

  // !
  filtredTask$: any;
  searchngText$: Observable<string>;

  addFormProject: FormGroup;
  addForm2: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService,
    private tasksService: TasksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: "",
      searching: "",
    });

    this.form.controls["searching"].valueChanges.subscribe((value) =>
      this.environment === "tasks"
        ? this.tasksService.emitSearchingValue(value)
        : this.tasksService.findProject(value)
    );
  }

  hidePanel(): void {
    this.finderPanel = false;
    this.mode = "";
  }

  setupPanel(mode: string): void {
    this.mode = mode;
    // Set panael state
    this.state = ["fas", mode];
    this.finderPanel = true;
  }

  add(): void {
    if (this.mode === "fa-plus") {
      this.hidePanel();
    } else if (!this.mode) {
      // first mode init
      this.setupPanel("fa-plus");
    } else {
      // stop searching elements
      this.setupPanel("fa-plus");
    }
  }

  searching(): void {
    if (this.mode === "fa-search") {
      this.hidePanel();
    } else if (!this.mode) {
      this.setupPanel("fa-search");
    } else {
      this.setupPanel("fa-search");
    }
  }

  addProject() {
    this.addFormProject = this.initForm();
    const projectList = this.createProjectList();
    // w serwisie taksService zrobić add dla projektow
    this.tasksService.addProject(projectList);
  }

  initForm() {
    return new FormGroup({
      name: new FormArray([
        new FormControl("Nowa nazwa projektu", Validators.required),
      ]),
      description: new FormArray([new FormControl("Opis")]),
      endDate: new FormArray([new FormControl(new Date())]),
    });
  }

  createProjectList() {
    const projectList = new Array<Project>();

    const nameArr = <[string]>this.addFormProject.get("name").value;
    const descriptionArr = <[string]>(
      this.addFormProject.get("description").value
    );
    const endDateArr = <[Date]>this.addFormProject.get("endDate").value;

    for (var _i = 0; _i < nameArr.length; _i++) {
      const project = {
        projectid: null,
        name: this.form.controls["title"].value,
        created: new Date(),
        description: descriptionArr[_i],
        status: "P",
        userId: this.authService.user.uid,
        endDate: endDateArr[_i],
      };
      projectList.push(project);
    }
    /// debugger;
    return projectList;
  }

  createTaskList() {
    const tasksList = new Array<Task>();

    const tasksArr = <[string]>this.addForm2.get("taskName").value; //pobieramy talbice tasków

    const priorArr = <[number]>this.addForm2.get("priority").value; //pobieramy priorytety

    // w petli dla każdego taskName pobieramy taski.
    /*     tasksArr.forEach(taskName => {
      const task = { name: taskName, userId: this.authService.user.uid, created: new Date().toLocaleString(), isDone: 0 , priority: 1};
      tasksList.push(task);
    }); */

    for (var _i = 0; _i < tasksArr.length; _i++) {
      const task = {
        id: null,
        userId: this.authService.user.uid,
        name: this.form.controls["title"].value,
        created: new Date().toLocaleString(),
        end: null,
        isDone: 0,
        priority: priorArr[_i],
        projectid: this.tasksService.projectListService[0].projectid,
      };
      console.log(
        "Wykonuję add-task.component.ts createTaskList() #2 [task] =" + task
      );
      tasksList.push(task);
      //debugger;
      //! tutaj potrzebne jest odczytanie projectId dla konkretnego użytkownika
      //! sprobować w serwisie odczytać projectId a potem go odczytać tutaj
    }

    return tasksList;
  }

  addTask() {
    console.log("Wykonuję add-task.component.ts addTask() #2" + this.addForm2);
    this.addForm2 = this.initForm2();
    const taskList = this.createTaskList();
    this.tasksService.add(taskList);
    this.tasksService.saveTaskInDB();
  }

  initForm2() {
    return new FormGroup({
      taskName: new FormArray([new FormControl(null, Validators.required)]),
      priority: new FormArray([new FormControl("1")]),
    });
  }

  formSubmit(): void {
    if (this.mode === this.icons.addition) {
      const { title } = this.form.getRawValue();
      this.environment === "tasks" ? this.addTask() : this.addProject();
      // : this.projectService.addProject(title);
      this.mode = "";
      this.finderPanel = !this.finderPanel;
      this.activeDescription.emit(true);
    }

    console.log(this.tasksService.getTasksListObs());
  }
}
