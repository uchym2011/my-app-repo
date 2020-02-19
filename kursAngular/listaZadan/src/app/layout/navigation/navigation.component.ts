import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { LoginHandlerService } from "src/app/auth/login-handler.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent {
  userPanelAvailable: boolean;
  constructor(
    public authService: AuthService,
    private router: Router,
    private loginHandlerSerice: LoginHandlerService
  ) {
    this.authService.userIsLoggedObs.subscribe(
      state => (this.userPanelAvailable = state)
    );
    console.log("Wykonuję app.component.ts constructor #1");
    console.log("SPR AUTH SERVICE");
    console.log(this.authService.user);
  }

  logout() {
    console.log("Wykonuję app.component.ts logout() #1");
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  activeLogin() {
    this.loginHandlerSerice.activeLoginPopup();

    // this.router.navigate(["/todoTask"]);
    // console.log("authService.user");
    console.log(this.authService.user);
  }
}
