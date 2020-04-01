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
  @Output() activedSort: EventEmitter<any> = new EventEmitter();

  private addingMode = "addition";
  private searchingMode = "searching";
  private sortingMode = "sort";
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
    // ! TUTAJ IF POWINIEN BYĆ NA ZEWNĄTRZ, ALE NIE ZADZIAŁA VALUE CHANGES
    // ! PRAWDOPODOBNIE SPRAWA ZOSTANIE ROZIWĄZANA WRAZ Z RXJS
    console.log(this.mode);
    this.form.valueChanges.subscribe(values => {
      if (this.mode === this.searchingMode) {
        this.startFinding(values.projectContent);
      }
    });
  }

  changeMode(event) {
    // ! USTAWIAM TRYB W KTÓRYM WYSZUKIWARKA MA SZUKAĆ :)
    // ! CHANGE ON SWITCH
    if (event.target.classList[1] === "fa-plus") {
      this.mode = this.addingMode;
      this.inputActive = !this.inputActive;
    } else if (event.target.classList[1] === "fa-search") {
      this.mode = this.searchingMode;
      this.inputActive = !this.inputActive;
    } else if (event.target.classList[1] === "fa-sort-amount-up") {
      this.mode = this.sortingMode;
      this.activedSort.emit();
    }
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
    // this.environment === "tasks" ? this.addTask() : this.addProject();

    if (this.environment === "tasks" && this.mode === this.addingMode) {
      this.addTask();
    } else if (
      this.environment === "projects" &&
      this.mode === this.addingMode
    ) {
      this.addProject();
    } else if (this.environment === "findTask") {
      this.startFinding(this.form.value.projectContent);
    }
    this.inputActive = !this.inputActive;
  }
}
