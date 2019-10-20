import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // providers: [TasksService] przeniesiony do @ng_module
})
export class AppComponent {

}
