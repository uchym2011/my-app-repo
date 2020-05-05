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

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService
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

  formSubmit(): void {
    if (this.mode === this.icons.addition) {
      const { title } = this.form.getRawValue();
      this.environment === "tasks"
        ? this.projectService.addTask(title)
        : this.projectService.addProject(title);
      this.mode = "";
      this.finderPanel = !this.finderPanel;
      this.activeDescription.emit(true);
    }
  }
}
