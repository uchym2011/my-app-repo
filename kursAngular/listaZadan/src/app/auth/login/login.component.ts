import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { LoginHandlerService } from "../login-handler.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private loginHandlerService: LoginHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(formData: NgForm) {
    console.log("Wykonuję add-login.component.ts login #1 !!!!");
    this.authService.login(formData.value.email, formData.value.password);
    this.unactiveLoginComp();
  }

  unactiveLoginComp() {
    this.loginHandlerService.activeLoginPopup();
    this.loginHandlerService.setLoginPopupState().subscribe();
  }
}
