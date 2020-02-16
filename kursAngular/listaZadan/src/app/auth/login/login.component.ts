import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginHandlerService } from "../login-handler.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  loginBtn: boolean;
  constructor(
    public authService: AuthService,
    private router: Router,
    private loginHanlerService: LoginHandlerService
  ) {
    // console.log("Wykonuję add-login.component.ts constructor #1");
    this.loginHanlerService
      .setLoginPopupState()
      .subscribe(popup => (this.loginBtn = popup));
  }

  // w serwisie wywołuje rejestrację
  signup(formData: NgForm) {
    console.log("Wykonuję add-login.component.ts signup #1");
    this.authService.signup(formData.value.email, formData.value.password);
  }
}
