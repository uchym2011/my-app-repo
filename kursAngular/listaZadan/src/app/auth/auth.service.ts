import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;
  // * LOGING STATE
  userIsLogged = false;
  userIsLoggedObs = new BehaviorSubject<boolean>(this.userIsLogged);

  // user = new BehaviorSubject<any>(false);

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    // pilnuje czy jestesmy zalogowani
    console.log("Wykonuję auth.service.ts constructor #1");
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  changeLoginState() {
    this.userIsLogged = !this.userIsLogged;
    this.userIsLoggedObs.next(this.userIsLogged);
  }

  login(email: string, password: string) {
    console.log("Wykonuję auth.service.ts login #1");
    this.angularFire.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // ! MOZNA COS LEPSZEGO DAĆ BO TO TAK JAKBY PO IFie
        this.changeLoginState();
        this.router.navigate(["/todoTask"]);
      })
      .catch(err => {
        const check = err;
        if (check.code == "auth/wrong-password") {
          check.message = "Wpisane hasło jest niepoprawne!";
        } else if (check.code == "auth/invalid-email") {
          check.message = "Niepoprawnie wpisany adres email!";
        } else if (check.code == "auth/too-many-requests") {
          check.message =
            "Zbyt dużo błędnych logowań, spróbuj ponownie później";
        }

        alert(check.message);
        console.log(err);
      });
  }

  signup(email: string, password: string) {
    console.log("Wykonuję auth.service.ts signup #1");
    this.angularFire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.changeLoginState();
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    this.changeLoginState();
    console.log("Wykonuję auth.service.ts logout #1");
    this.angularFire.auth.signOut();
  }
}
