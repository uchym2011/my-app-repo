import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    // pilnuje czy jestesmy zalogowani
    console.log('Wykonuję auth.service.ts constructor #1');
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    console.log('Wykonuję auth.service.ts login #1');
    this.angularFire.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/todoTask']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  signup(email: string, password: string) {
    console.log('Wykonuję auth.service.ts signup #1');
    this.angularFire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    console.log('Wykonuję auth.service.ts logout #1');
    this.angularFire.auth.signOut();
  }

}
