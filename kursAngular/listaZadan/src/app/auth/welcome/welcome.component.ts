import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginHandlerService } from "../login-handler.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
  loginBtn: boolean;
  constructor(
    public authService: AuthService,
    private loginHanlerService: LoginHandlerService
  ) {
    console.log("Wykonuję add-login.component.ts constructor #1");
    this.loginHanlerService
      .setLoginPopupState()
      .subscribe(popup => (this.loginBtn = popup));
  }
}
