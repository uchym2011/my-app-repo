import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProjectsService } from "src/app/services/projects.service";
import { ManagementIcons } from "src/app/models/ManagementToolIcons";

@Component({
  selector: "app-management-tools",
  templateUrl: "./management-tools.component.html",
  styleUrls: ["./management-tools.component.scss"],
})
export class ManagementToolsComponent implements OnInit {
  // ! A MOŻE HOOK ON CHANGES :P?
  @Input() environment;
  @Output() emitFinder: EventEmitter<any> = new EventEmitter();
  @Output() activedSort: EventEmitter<any> = new EventEmitter();
  @Output() activeDescription: EventEmitter<any> = new EventEmitter();

  state = [];

  icons: ManagementIcons = {
    addition: "fa-plus",
    search: "fa-search",
    sort: "fa-sort-amount-up",
  };

  mode: string;
  inputActive = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      projectContent: "",
    });
    // ! TUTAJ IF POWINIEN BYĆ NA ZEWNĄTRZ, ALE NIE ZADZIAŁA VALUE CHANGES
    // ! PRAWDOPODOBNIE SPRAWA ZOSTANIE ROZIWĄZANA WRAZ Z RXJS
    this.form.valueChanges.subscribe((values) => {
      if (this.mode === this.icons.search) {
        this.startFinding(values.projectContent);
      }
    });
  }

  changeInputState(chosenMode) {
    // ! MOżna TO ZROBIĆ Z RXJS
    //! this.mode jako SUBSCRIBER i valueChanges w ngOninit
    if (chosenMode !== "fa-sort-amount-up") {
      this.state = ["fas", chosenMode];
    }
  }

  stopSearchingList(mode) {
    mode === "fa-search" ? this.startFinding(null) : null;
  }

  changeMode(event) {
    // ! USTAWIAM TRYB W KTÓRYM WYSZUKIWARKA MA SZUKAĆ :)
    // ! CHANGE ON SWITCH
    const targetClassName = event.target.classList[1];
    this.mode
      ? this.stopSearchingList(this.mode)
      : (this.inputActive = !this.inputActive);
    this.mode = targetClassName;
    this.changeInputState(targetClassName);
  }

  handleList() {
    this.stopSearchingList(this.mode);
    this.mode = "";
    this.inputActive = false;
    this.activedSort.emit();
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
    if (this.mode === this.icons.addition) {
      this.environment === "tasks" ? this.addTask() : this.addProject();
      this.mode = "";
      this.inputActive = !this.inputActive;
      this.activeDescription.emit(true);
    }
  }
}
