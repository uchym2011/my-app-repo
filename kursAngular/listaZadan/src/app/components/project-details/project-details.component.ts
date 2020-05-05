import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "src/app/models/task";
import { FormGroup, FormBuilder } from "@angular/forms";
import { formatDate } from "@angular/common";
import { ProjectsService } from "src/app/services/projects.service";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() active = false;

  @Input() set taskData(value: Task) {
    this._taskData = value;
    if (this.detailsForm) {
      this.detailsForm.patchValue({
        finishDate: formatDate(this._taskData.finishDate, "yyyy-MM-dd", "en"),
        description: this._taskData.description,
      });
    }
  }

  @Output() unactiveDetails: EventEmitter<any> = new EventEmitter();

  _taskData: Task;
  detailsForm: FormGroup;
  chackIT = "TAK";

  isEnabledDescription = true;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.detailsForm = this.fb.group({
      finishDate: formatDate(this._taskData.finishDate, "yyyy-MM-dd", "en"),
      description: this._taskData.description,
    });
  }

  activeDescription() {
    this.isEnabledDescription = false;
  }

  unactiveDescription() {
    this.isEnabledDescription = true;
  }

  unactivePanel() {
    const { finishDate, description } = this.detailsForm.getRawValue();
    const { id } = this._taskData;
    this.projectsService.changeTask({ id, finishDate, description });
    this.active = false;
    this.unactiveDetails.emit(this.active);
  }
}
