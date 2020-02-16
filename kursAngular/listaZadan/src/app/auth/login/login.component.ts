import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(public authService: AuthService) {
    console.log("Wykonuję add-login.component.ts constructor #1");
  }

  // w serwisie wywołuje rejestrację
  signup(formData: NgForm) {
    // ! SPR formData
    console.log("Wykonuję add-login.component.ts signup #1");
    this.authService.signup(formData.value.email, formData.value.password);
  }
}
