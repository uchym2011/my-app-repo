import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { LoginHandlerService } from "src/app/auth/login-handler.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
  userPanelAvailable: boolean;
  constructor(
    public authService: AuthService,
    private router: Router,
    private loginHandlerSerice: LoginHandlerService
  ) {
    console.log("Wykonuję app.component.ts constructor #1");
    console.log(this.authService.user);
    this.authService.userIsLoggedObs.subscribe(
      state => (this.userPanelAvailable = state)
    );
  }

  logout() {
    console.log("Wykonuję app.component.ts logout() #1");
    this.authService.logout();
    this.router.navigate(["/login"]);
    this.authService.changeLoginState();
  }
  activeLogin() {
    this.loginHandlerSerice.activeLoginPopup();
    console.log(this.userPanelAvailable);
  }
}
