import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProjectsService } from "src/app/services/projects.service";

@Component({
  selector: "app-management-tools",
  templateUrl: "./management-tools.component.html",
  styleUrls: ["./management-tools.component.scss"]
})
export class ManagementToolsComponent implements OnInit {
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
      console.log(values.projectContent)
    );
  }

  toggleInput() {
    this.inputActive = !this.inputActive;
  }

  add() {
    this.projectService.addTask(this.form.value.projectContent);
    console.log(this.projectService.initialProject);
  }
}
