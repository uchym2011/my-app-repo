import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProjectsService } from "src/app/services/projects.service";

@Component({
  selector: "app-management-tools",
  templateUrl: "./management-tools.component.html",
  styleUrls: ["./management-tools.component.scss"]
})
export class ManagementToolsComponent implements OnInit {
  @Input() environment;
  @Output() emitFinder: EventEmitter<any> = new EventEmitter();

  mode: string;
  inputActive = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      projectContent: ""
    });

    this.form.valueChanges.subscribe(values =>
      this.startFinding(values.projectContent)
    );
  }

  changeMode(event) {
    // ! USTAWIAM TRYB W KTÓRYM WYSZUKIWARKA MA SZUKAĆ :)
    // ! CHANGE ON SWITCH
    if (event.target.classList[1] === "fa-plus") {
      this.mode = "addition";
    } else if (event.target.classList[1] === "fa-search") {
      this.mode = "searching";
    }
    console.log(this.mode);
    this.inputActive = !this.inputActive;
  }

  addTask() {
    this.projectService.addTask(this.form.value.projectContent);
  }

  addProject() {
    this.projectService.addProject(this.form.value.projectContent);
  }

  startFinding(searchingText: string) {
    this.emitFinder.emit(searchingText);
  }

  formSubmit() {
    this.environment === "tasks" ? this.addTask() : this.addProject();
    this.inputActive = !this.inputActive;

    if (this.environment === "tasks") {
      this.addTask();
    } else if (this.environment === "projects") {
      this.addProject();
    } else if (this.environment === "findTask") {
      this.startFinding(this.form.value.projectContent);
    }
  }
}
