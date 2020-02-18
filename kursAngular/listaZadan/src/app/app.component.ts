import { Component, OnInit } from "@angular/core";
import { TasksService } from "./services/tasks.service";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
import { LoginHandlerService } from "./auth/login-handler.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
  // providers: [TasksService] przeniesiony do @ng_module
})
export class AppComponent {
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

//  TODO3: ZRÓB TAK aby ROUTER DZIALAL! :)
//  TODO3: NON STOP MA DOSTĘP DO TEGO CO POWINNE OBIETE ZOSTAĆ AUTORYZACJA

//  TODO: BRAK AUTORYZACJI
//  TODO1: Stwórz katalog dla komponentów i dla elementów zawierających tylko layout i ładnie pozmieniaj, aby byøo spojnie
//  TODO2: ZMień nazwy plików na których działałeś ta aby byøy spójne
