import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginHandlerService {
  signUp = false;
  signUpObs = new BehaviorSubject<boolean>(this.signUp);

  constructor() {}

  activeLoginPopup(): void {
    this.signUp = !this.signUp;
    this.signUpObs.next(this.signUp);
  }

  setLoginPopupState(): Observable<boolean> {
    return this.signUpObs.asObservable();
  }
}
