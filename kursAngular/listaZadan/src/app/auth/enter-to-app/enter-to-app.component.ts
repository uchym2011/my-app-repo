import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { LoginHandlerService } from "../login-handler.service";

@Component({
  selector: "app-enter-to-app",
  templateUrl: "./enter-to-app.component.html",
  styleUrls: ["./enter-to-app.component.css"]
})
export class EnterToAppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  // w serwisie wywołuje rejestrację
  signup(formData: NgForm) {
    // ! SPR formData
    console.log("Wykonuję add-login.component.ts signup #1");
    this.authService.signup(formData.value.email, formData.value.password);
  }
}
