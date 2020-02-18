import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { LoginHandlerService } from "../login-handler.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login1",
  templateUrl: "./login1.component.html",
  styleUrls: ["./login1.component.css"]
})
export class Login1Component implements OnInit {
  constructor(
    public authService: AuthService,
    private loginHandlerService: LoginHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(formData: NgForm) {
    console.log("Wykonuję add-login.component.ts login #1 !!!!");
    console.log(formData);
    this.authService.login(formData.value.email, formData.value.password);
    this.router.navigate(["/todoTask"]);
    this.unactiveLoginComp();
  }

  unactiveLoginComp() {
    this.loginHandlerService.activeLoginPopup();
    this.loginHandlerService
      .setLoginPopupState()
      .subscribe(popupState => console.log(popupState));
  }
}
