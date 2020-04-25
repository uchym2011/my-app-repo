import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProjectsService } from "src/app/services/projects.service";
import { ManagementIcons } from "src/app/models/ManagementToolIcons";
import { Observable } from "rxjs";

@Component({
  selector: "app-management-tools",
  templateUrl: "./management-tools.component.html",
  styleUrls: ["./management-tools.component.scss"],
})
export class ManagementToolsComponent implements OnInit {
  // ! A MOŻE HOOK ON CHANGES :P?
  @Input() environment;
  @Output() beginFinding: EventEmitter<any> = new EventEmitter();
  @Output() activedSort: EventEmitter<any> = new EventEmitter();
  @Output() activeDescription: EventEmitter<any> = new EventEmitter();

  state = [];

  activeTool: string;
  modde: Observable<any>;

  icons: ManagementIcons = {
    addition: "fa-plus",
    search: "fa-search",
    sort: "fa-sort-amount-up",
  };

  mode: string;
  availablePanel = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: "",
    });
    this.form.valueChanges.subscribe((values) => {
      if (this.mode === this.icons.search) {
        this.startFinding(values.title);
      }
    });
  }

  changePanelState(chosenMode) {
    if (chosenMode !== "fa-sort-amount-up") {
      this.state = ["fas", chosenMode];
    }
  }

  stopFindingElements(mode) {
    mode === "fa-search" ? this.startFinding("") : null;
  }

  deactivePanel() {
    this.availablePanel = false;
    this.mode = "";
  }

  setupPanel(mode) {
    this.mode = mode;
    this.changePanelState(mode);
  }

  add() {
    if (this.mode === "fa-plus") {
      this.deactivePanel();
    } else if (!this.mode) {
      this.setupPanel("fa-plus");
      this.availablePanel = true;
    } else {
      this.stopFindingElements(this.mode);
      this.setupPanel("fa-plus");
    }
  }

  searching() {
    if (this.mode === "fa-search") {
      this.deactivePanel();
    } else if (!this.mode) {
      this.setupPanel("fa-search");
      this.availablePanel = true;
    } else {
      this.setupPanel("fa-search");
    }
  }
  // HOW TO STOP FINDING
  startFinding(searchingText) {
    this.beginFinding.emit(searchingText);
  }

  addTask() {
    this.projectService.addTask(this.form.value.title);
  }

  addProject() {
    this.projectService.addProject(this.form.value.title);
  }

  formSubmit() {
    if (this.mode === this.icons.addition) {
      this.environment === "tasks" ? this.addTask() : this.addProject();
      this.mode = "";
      this.availablePanel = !this.availablePanel;
      this.activeDescription.emit(true);
    }
  }
}
