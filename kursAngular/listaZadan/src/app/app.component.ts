import { Component, OnInit } from "@angular/core";
import { TasksService } from "./services/tasks.service";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
  // providers: [TasksService] przeniesiony do @ng_module
})
export class AppComponent {
  loginBtn = false;

  constructor(public authService: AuthService, private router: Router) {
    console.log("Wykonuję app.component.ts constructor #1");
  }

  logout() {
    console.log("Wykonuję app.component.ts logout() #1");
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  // !
  activeLogin() {
    this.loginBtn = !this.loginBtn;
    console.log(this.loginBtn);
  }
}
