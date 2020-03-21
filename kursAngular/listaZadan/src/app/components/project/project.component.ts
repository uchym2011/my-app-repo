import { Component, OnInit, Input } from "@angular/core";
import { Project } from "src/app/models/project";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"]
})
export class ProjectComponent implements OnInit {
  @Input() project;

  constructor() {}

  ngOnInit() {}
}
