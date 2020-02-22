import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { LoginHandlerService } from "../login-handler.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  // w serwisie wywołuje rejestrację
  signup(formData: NgForm) {
    console.log("Wykonuję add-login.component.ts signup #1");
    this.authService.signup(formData.value.email, formData.value.password);
  }
}
