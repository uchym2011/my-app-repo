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
        finishDate: this.correctDateFormat(
          this._taskData.created,
          "DD.MM.RRRR"
        ),
        // description: this._taskData.description,
        description: "description", // ! Dopoprawnego wyświetlania potrzeba dodanie typu description na bazie
      });
    }
  }

  @Output() unactiveDetails: EventEmitter<any> = new EventEmitter();

  _taskData: any;
  detailsForm: FormGroup;
  chackIT = "TAK";

  isEnabledDescription = true;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    console.log(this._taskData);
    this.detailsForm = this.fb.group({
      finishDate: formatDate(
        new Date(this._taskData.created.slice(0, 10)),
        "yyyy-MM-dd",
        "en"
      ),
      // description: this._taskData.description,
      description: "descrription",
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
    const { _id } = this._taskData;
    this.projectsService.changeTask({ _id, finishDate, description });
    this.active = false;
    this.unactiveDetails.emit(this.active);
  }

  correctDateFormat(date: string, initFormat: "DD.MM.RRRR") {
    // ! DOCELOWO Z BAZY POWINIEN LECIEĆ POPRAWNY FORMAT
    const time: any = {};
    const dataTime = date.slice(0, 10).split(".");
    const restTime = date.slice(10, date.length);

    // Create contain time object
    initFormat
      .slice(0, 10)
      .split(".")
      .forEach((type, index) => (time[type] = dataTime[index]));

    return `${time.RRRR}-${time.MM}-${time.DD}`;
  }
}
