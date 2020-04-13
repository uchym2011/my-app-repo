import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() active = false;
  @Output() unactiveDetails: EventEmitter<any> = new EventEmitter();

  isEnabledDescription = true;

  constructor() {}

  ngOnInit() {}

  activeDescription() {
    this.isEnabledDescription = false;
  }

  unactiveDescription() {
    this.isEnabledDescription = true;
  }

  unactivePanel() {
    this.active = false;
    this.unactiveDetails.emit(this.active);
  }
}
