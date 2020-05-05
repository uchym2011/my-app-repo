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
   * Trigger finding item proces
   */
  @Output() beginFinding: EventEmitter<any> = new EventEmitter();

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

  addFormProject: FormGroup;

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

    this.form.controls["searching"].valueChanges.subscribe((text) => {
      this.beginFinding.emit(text);
    });
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
      this.beginFinding.emit("");
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
        name: nameArr[_i],
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

  formSubmit(): void {
    if (this.mode === this.icons.addition) {
      const { title } = this.form.getRawValue();
      this.environment === "tasks"
        ? this.projectService.addTask(title)
        : this.addProject();
      // : this.projectService.addProject(title);
      this.mode = "";
      this.finderPanel = !this.finderPanel;
      this.activeDescription.emit(true);
    }
  }
}
