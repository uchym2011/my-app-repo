import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProjectsService } from "src/app/services/projects.service";

@Component({
  selector: "app-management-tools",
  templateUrl: "./management-tools.component.html",
  styleUrls: ["./management-tools.component.scss"]
})
export class ManagementToolsComponent implements OnInit {
  @Input() environment;

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

    // this.form.valueChanges.subscribe(values =>
    //   // console.log(values.projectContent)
    // );
  }

  toggleInput() {
    this.inputActive = !this.inputActive;
  }

  addTask() {
    this.projectService.addTask(this.form.value.projectContent);
  }

  addProject() {
    this.projectService.addProject(this.form.value.projectContent);
  }

  formSubmit() {
    this.environment === "tasks" ? this.addTask() : this.addProject();
    this.toggleInput();
  }
}
