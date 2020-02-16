import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login1",
  templateUrl: "./login1.component.html",
  styleUrls: ["./login1.component.css"]
})
export class Login1Component implements OnInit {
  @Input()
  loginActive;
  @Output()
  unactiveLoginPopup = new EventEmitter();
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  login(formData: NgForm) {
    console.log("Wykonuję add-login.component.ts login #1");
    this.authService.login(formData.value.email, formData.value.password);
  }

  unactiveLoginComp() {
    this.unactiveLoginPopup.emit();
  }
}
